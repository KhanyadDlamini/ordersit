const soap = require("soap");
const axios = require("axios");
const express = require("express");

const url = "http://10.1.22.17/traveldoctest/Service1.asmx?WSDL";
const saveDocUrl = "http://10.1.22.17/trvlpay/savedoc.asmx?WSDL";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/requestToPayTravelDoc", async (req, res) => {
    const { pin, amount, name, passportType, appType, recType, cellphone } = req.body;

    console.log("Request params:", { pin, amount, name, passportType, appType, recType, cellphone });

    const args = { pin };

    try {
        // Step 1: Get details from TravelDoc
        const client = await soap.createClientAsync(url);
        const [result] = await client.getTravelDocAsync(args);

        if (!result || !result.getTravelDocResult) {
            return res.status(400).json({ error: "No details returned from TravelDoc service" });
        }

        const details = result.getTravelDocResult;
        console.log("TravelDoc Response:", details);

        // Receipt date as decimal (yyyymmdd)
        const today = new Date();
        const receiptDate = parseInt(today.toISOString().split("T")[0].replace(/-/g, ""));

        // Step 2: Request payment from MoMo
        const momoUrl = `https://giyh.gov.sz/momo/requesttopay?cellphone=268${cellphone}&message=none&note=none&amount=${amount}`;
        console.log("MoMo URL:", momoUrl);

        const momoResponse = await axios.get(momoUrl);
        console.log("MoMo Response:", momoResponse.data);

        const referenceId = momoResponse.data;
        if (!referenceId) {
            return res.status(400).json({ error: "No referenceId returned from MoMo" });
        }

        // Step 3: Check payment status
        const statusUrl = `https://giyh.gov.sz/momo/getStatus?transactionReferenceId=${referenceId}`;
        const statusResponse = await axios.get(statusUrl);
        console.log("MoMo Status Response:", statusResponse.data);

        let transactionId = null;
        let status = null;

        if (typeof statusResponse.data === "string") {
            const parts = statusResponse.data.split(",");
            status = parts[0]?.trim();
            transactionId = parseInt(parts[1]?.trim());
        } else if (statusResponse.data.transactionId) {
            status = statusResponse.data.status;
            transactionId = parseInt(statusResponse.data.transactionId);
        }

        if (!transactionId) {
            return res.status(400).json({ error: "No transactionId found from MoMo" });
        }

        console.log("Payment Status:", status);
        console.log("Transaction ID:", transactionId);

        // Step 4: Save transaction to trvlpay
        const saveClient = await soap.createClientAsync(saveDocUrl);
        console.log("Available saveDoc methods:", Object.keys(saveClient));

        const saveDocArgs = {
            transactionId: transactionId,
            pin: pin,
            name: name,
            receiptDate: receiptDate,
            passportType: passportType,
            recType: recType,
            Amount: amount,
            ApplicationTypeCode: appType,
        };

        console.log("SaveTDpay args:", saveDocArgs);

        let saveResult;
        if (typeof saveClient.SaveTDpayAsync === "function") {
            [saveResult] = await saveClient.SaveTDpayAsync(saveDocArgs);
        } else if (typeof saveClient.SaveTDpay === "function") {
            saveResult = await new Promise((resolve, reject) => {
                saveClient.SaveTDpay(saveDocArgs, (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });
        } else {
            return res.status(500).json({ error: "SaveTDpay method not found in WSDL" });
        }

        console.log("✅ SaveTDpay Response:", saveResult);
        return res.json({ status: "success", paymentStatus: status, saveResult });

    } catch (err) {
        console.error("❌ Error in flow:", err);
        return res.status(500).json({ error: err.message });
    }
});

// GET TRAVEL DOC LOOKUP
app.get('/getTravelDocPayment', async (req, res) => {
    const { pin } = req.query;
    console.log("pin", pin)
    if (!pin) return res.status(400).json({ error: "PIN is required" });

    try {
        soap.createClient("http://10.1.22.17/traveldoctest/Service1.asmx?WSDL", (err, client) => {
            if (err) {
                console.error("SOAP Client Error:", err);
                return res.status(500).json({ error: "Failed to create SOAP client" });
            }

            client.getTravelDoc({ pin: pin }, (err, result) => {
                if (err) {
                    console.error("SOAP Call Error:", err);
                    return res.status(500).json({ error: "SOAP request failed" });
                }

                if (result && result.getTravelDocResult) {
                    res.json(result.getTravelDocResult);
                } else {
                    res.status(500).json({ error: "Invalid SOAP response" });
                }
            });
        });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// // main();


// // const soap = require("soap");

// // const url = "http://10.1.22.17/Cincom/Service1.asmx?WSDL";

// // // CIN / companyID to push
// // const args = { companyID: "6204206100036" };

// // soap.createClient(url, (err, client) => {
// //     if (err) {
// //         console.error("Error creating SOAP client:", err);
// //         return;
// //     }

// //     client.Xcomcin(args, (err, result) => {
// //         if (err) {
// //             console.error("SOAP request error:", err);
// //         } else {
// //             console.log("SOAP response:", JSON.stringify(result, null, 2));
// //         }
// //     });
// // });



// // const soap = require("soap");

// // const saveDocUrl = "http://10.1.22.17/trvlpay/savedoc.asmx?WSDL";

// // async function testSave() {
// //     try {
// //         const saveClient = await soap.createClientAsync(saveDocUrl);
// //         console.log("Available methods:", Object.keys(saveClient));

// //         const saveDocArgs = {
// //             transactionId: 1952888360,
// //             pin: 4401011100126,
// //             name: "DLAMINI BESTER QINILE",
// //             receiptDate: 20250818,
// //             passportType: 4,
// //             recType: "TRAVEL DOC NEW APPLICATION",
// //             Amount: 300,
// //             ApplicationTypeCode: 1,
// //         };

// //         if (typeof saveClient.SaveTDpayAsync === "function") {
// //             const [result] = await saveClient.SaveTDpayAsync(saveDocArgs);
// //             console.log("✅ SaveTDpay Response:", result);
// //         } else {
// //             console.error("⚠️ SaveTDpay method not found.");
// //         }
// //     } catch (err) {
// //         console.error("❌ Error:", err.message);
// //     }
// // }

// // testSave();

// const soap = require("soap");

// const url = "http://10.1.22.17/trvldocrec/Service1.asmx?WSDL";
// const TID = 1953131932; // Replace with actual transaction ID

// soap.createClient(url, (err, client) => {
//     if (err) {
//         console.error("Error creating SOAP client:", err);
//         return;
//     }

//     // 🔍 Inspect available methods
//     const description = client.describe();
//     console.log("SOAP Methods:\n", JSON.stringify(description, null, 2));

//     // Get the first service, first port, first method
//     const serviceName = Object.keys(description)[0];
//     const portName = Object.keys(description[serviceName])[0];
//     const methodName = Object.keys(description[serviceName][portName])[0];

//     console.log(`Using method: ${serviceName} -> ${portName} -> ${methodName}`);

//     // Build args according to WSDL
//     const args = { TID };

//     // Call the detected method
//     client[serviceName][portName][methodName](args, (err, result) => {
//         if (err) {
//             console.error("SOAP request error:", err);
//             return;
//         }

//         console.log("Full SOAP Response:", result);

//         // Depending on the WSDL, the response wrapper may differ
//         const responseKey = Object.keys(result)[0];
//         const response = result[responseKey];

//         console.log("✅ Parsed Response:");
//         console.log("TID:", response.TID);
//         console.log("Message:", response.Message);
//         console.log("Receipt No:", response.ReceiptNo);
//         console.log("Amount:", response.Amount);
//     });
// });

// const axios = require("axios");

// const cell = "26879464244"; // Destination number
// const message = "Hi there, here is the application link: https://expo.dev/accounts/khanyakwezwe/projects/GIYH/builds/374f5ec3-7c2a-4ab8-990b-dd1c86fc1f1b";

// const url = "https://sms.eswatinimobile.co.sz/submit/single/";

// const params = {
//     api_token: "V0ybQeElWrtNKh4IkxVUjjJ08p56CAnX097pqoHOqVv9ZTO1Zadi9horCybd2EAY",
//     da: cell,         // Destination address (phone number)
//     ud: message,      // Message content
//     id: "01",         // Unique ID (can be anything per request)
//     src: "HomeAffairs" // Sender name (registered with the provider)
// };

// async function sendSMS() {
//     try {
//         const response = await axios.post(url, null, { params });
//         console.log("SMS sent successfully:", response.data);
//     } catch (error) {
//         console.error("Error sending SMS:", error.message);
//     }
// }

// sendSMS();