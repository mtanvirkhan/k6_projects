const requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");
requestHeaders.append("Cookie", "XSRF-TOKEN=bd59023a-6716-4faa-98d1-d9487ee57cc0");

const requestOptions = (raw) => ({
  method: "POST",
  headers: requestHeaders,
  body: raw,
  redirect: "follow"
});

const url = "https://jp.qa-console-tc.pocketalk.com/iotconsoleapi-co/api/pub/measurement";

function getCurrentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function makeFetchCalls() {
  for (let i = 6666; i < 10005; i++) {
    const raw = JSON.stringify({
      "mcc": "440",
      "mnc": "100",
      "lac": "1234",
      "cid": "12345678",
      "networktype": "mobile",
      "fromlang": "en",
      "tolang": "bn",
      "fromlength": 63,
      "tolength": 21,
      "fromtext": `Tanvir_SQA Load Testing. Count: ${i}`,
      "totext": `এসকিউএ লোড টেস্টিং. গণনা: ${i}`,
      "total": 1291,
      "timestamp": getCurrentTimestamp(),
      "imei1": "788877001950401",
      "imei2": "788877002950401",
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
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 seconds
  }
}

makeFetchCalls();
