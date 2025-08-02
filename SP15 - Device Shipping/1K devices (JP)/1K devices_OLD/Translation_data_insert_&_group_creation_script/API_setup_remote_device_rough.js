import http from 'k6/http';
import { group, check, sleep } from 'k6';

//console.log(csvData);

export const options = {
    vus: 1,
    iterations: 1
}

export default function () {
  group("Testing PT Console API", function () {

    const body = JSON.stringify({
        "groupId": 1639,
        "commonSettings": null,
        "remoteSettingModeId": 2
    });

    const params = {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Content-Type': 'application/json',
        'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imxja1QwTjZCNTV2ck1zRGRORElnQSJ9.eyJjdXN0b21lcl9uYW1lIjoiQkpJVCIsImlzcyI6Imh0dHBzOi8vY3Jvd24tZGV2LmpwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NmExMDgwYzBmNjZiMTEyYTM3MzQwNjciLCJhdWQiOlsiaHR0cHM6Ly9hcGkucG9ja2V0YWxrLmNvbSIsImh0dHBzOi8vY3Jvd24tZGV2LmpwLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjIzMzUzNzcsImV4cCI6MTcyMjMzNzE3Nywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsIm9yZ19pZCI6Im9yZ185NU1LTDVDWk1MQTlCOEF2IiwiYXpwIjoiNWhOVlFlTkhCamdEcW11aFJ3WU4zclppeDQ0S0tUTTgifQ.4ShnUBUzqRo1DUne4_kEqYlshqqBXXUj8Xh4Nj7F368NJbgTyIDI6TKnPBrZBtxCz_OI9Q-YZxWKXwCj9f_KdaX3oon_tPRZ46ZwaRMqiVoobdWi-kbrWvL2_XRqb772l5TeIisIek7tRMHXsxyan3N0AWV_kbItaAmCdbJ_Ij6aGoHWqmYr7QzSgAr_TONvbklugOS5Ouoz4jRiICzo1l1KajYmFTJqV4vbNE4vaiHIEOILwrFHlFBPPjfL8AaZKTw5C4lDAI6FzW143A0-Oa8NP83JVGXmcRwD0Xnv23B3rhAkGF84UicGAikYPymJTs3ClVAL5pJIeOdx3xEo0Q',
        'authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTcyMjMzNTM3NywiZXhwIjoxNzUzODcxMzc3fQ.oVZ4hWZAZi2WpdKPVZsdTHKuNR9zqz7sFtHY4Dtk-IZO5COHWwned0x6nqZ3ZIxTf1xbrCOWJQWhZZfEKShCvQ',
        'cookie': '_ga=GA1.1.1451134549.1722002757; _legacy_auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.is.authenticated=true; auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.is.authenticated=true; _legacy_auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.organization_hint=%22org_95MKL5CZMLA9B8Av%22; auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.organization_hint=%22org_95MKL5CZMLA9B8Av%22; XSRF-TOKEN=bc79860d-7cc6-419f-8788-fb3f97e1c7f8; _ga_WBCCSLWJX2=GS1.1.1722335354.12.1.1722335384.0.0.0',
        'priority': 'u=1, i',
        'referer': 'https://jp.qa-console-tc.pocketalk.com/devicelist',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        //'sec-fetch-site': 'same-origin',
        //'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'x-xsrf-token': 'bc79860d-7cc6-419f-8788-fb3f97e1c7f8'
      }
    };

    group("Translation data upload checking", function () {
      let res = http.post("https://jp.qa-console-tc.pocketalk.com/iotconsoleapi-co/api/private-auth/setup-remote-device", body, params);

      console.log(`Response status: ${res.status}`);
      console.log(`Response body: ${res.body}`);
    
      
      check(res, {
        "Status is 200 OK": (r) => r.status === 200,
        "Content-Type is JSON": (r) => r.headers["Content-Type"] === 'application/json',
        "Content-Length is smaller than 200": (r) => parseInt(r.headers["Content-Length"]) < 200
      });
    });
  });
}
