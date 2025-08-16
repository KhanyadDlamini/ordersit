// const soap = require("soap");

// const url = "http://10.1.22.17/traveldoctest/Service1.asmx?WSDL";

// const pin = 7812281100140
//     ; // decimal PIN

// const args = { pin };

// soap.createClient(url, (err, client) => {
//     if (err) {
//         console.error("Error creating SOAP client:", err);
//         return;
//     }

//     client.getTravelDoc(args, (err, result) => {
//         if (err) {
//             console.error("SOAP request error:", err);
//         } else {
//             console.log("SOAP response:", result);
//         }
//     });
// });
const soap = require("soap");

const url = "http://10.1.22.17/Cincom/Service1.asmx?WSDL";

// CIN / companyID to push
const args = { companyID: "6204206100036" };

soap.createClient(url, (err, client) => {
    if (err) {
        console.error("Error creating SOAP client:", err);
        return;
    }

    client.Xcomcin(args, (err, result) => {
        if (err) {
            console.error("SOAP request error:", err);
        } else {
            console.log("SOAP response:", JSON.stringify(result, null, 2));
        }
    });
});
