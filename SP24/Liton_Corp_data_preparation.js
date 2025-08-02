const requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");
requestHeaders.append("Cookie", "XSRF-TOKEN=bd59023a-6716-4faa-98d1-d9487ee57cc0");

const requestOptions = (raw) => ({
  method: "POST",
  headers: requestHeaders,
  body: raw,
  redirect: "follow"
});

const now = new Date();

const url = "https://cw-console.us.dev.pocketalk.com/iotconsoleapi-co/api/pub/measurement";

async function makeFetchCalls() {

  const imei1 = ['202306190000001', '202306190000002', '202306190000003', '202306190000004', '202306190000005', '202306190000006', '202306190000007', '202306190000008', '202306190000009', '202306190000010']
  const imei2 =  ['202004010000003', '200000000000001', '202301160000006', '295050910027704', '202008190000004', '202002140000006', '202008190000006', '202002140000011', '202008190000002', '202301160000005']
  
  
    for (let j =0; j < 10; j++) {
        for (let i = 0; i < 100; i++) {
            const raw = JSON.stringify({
              "mcc": "440",
              "mnc": "100",
              "lac": "1234",
              "cid": "12345678",
              "networktype": "mobile",
              "fromlang": "af",
              "tolang": "pa",
              "fromlength": 63,
              "tolength": 21,
              "fromtext": `SQA Data Preparation Liton_${now.toISOString().replace('T', ' ').split('.')[0]}`,
              "totext": `এসকিউএ লোড টেস্টিং_${now.toISOString().replace('T', ' ').split('.')[0]}`,
              "total": 1291,
              "timestamp": "2024-11-08 08:50:33",
              "imei1": `${imei1}`,         
              "imei2": `${imei2}`,
              "ipaddress": "150.21.16.225",
              "devicetype": "POCKETALK_S2",
              "version": "3.1.02_stg 0.4.8 3.0.4",
              "description": [
                {
                  "api": "Google Cloud Speech-to-Text",
                  "time": 321,
                  "type": "STT-total",
                  "conversionEngine": ""
                },
                {
                  "api": "Microsoft Text to Speech",
                  "time": 457,
                  "type": "TTT-total",
                  "conversionEngine": "Google"
                },
                {
                  "api": "NICT",
                  "time": 513,
                  "type": "TTS-total",
                  "conversionEngine": "ResponsiveVoice"
                },
                {
                  "api": "NICT",
                  "time": 96,
                  "type": "TTS-connection",
                  "conversionEngine": "ResponsiveVoice"
                },
                {
                  "api": "NICT",
                  "time": 103,
                  "type": "TTS-call",
                  "conversionEngine": "ResponsiveVoice"
                },
                {
                  "api": "NICT",
                  "time": 314,
                  "type": "TTS-response",
                  "conversionEngine": "ResponsiveVoice"
                }
              ]
            });
        
            try {
              const response = await fetch(url, requestOptions(raw));
              const result = await response.text();
              console.log(result);
            } catch (error) {
              console.error(error);
            }
            await new Promise(resolve => setTimeout(resolve, Math.floor(750 + Math.random() * 250))); // Random data from 750ms to 1000ms
          }
    }
}

makeFetchCalls();