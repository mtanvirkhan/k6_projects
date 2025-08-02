import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    checks: ['rate==1.0']
  }
}

export default function () {
  const url = 'https://jp.qa-console-tc.pocketalk.com/iotconsoleapi-co/api/private/device-list';
  const params = {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imxja1QwTjZCNTV2ck1zRGRORElnQSJ9.eyJjdXN0b21lcl9uYW1lIjoiVGVzdF9Db3JwXzciLCJpc3MiOiJodHRwczovL2Nyb3duLWRldi5qcC5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjZhNzY0M2ExNDlhMjRhNTE1YjA0ZmEwIiwiYXVkIjpbImh0dHBzOi8vYXBpLnBvY2tldGFsay5jb20iLCJodHRwczovL2Nyb3duLWRldi5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzIzMDkxMzIyLCJleHAiOjE3MjMwOTMxMjIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfSGVKa0Z3bkY3dnRoMGtwTSIsImF6cCI6IjVoTlZRZU5IQmpnRHFtdWhSd1lOM3JaaXg0NEtLVE04In0.S9nFRpArY0MuuklNSncUNpDOp9w2ntNdiF9HFAzIhjsVsFSJvgoXvgOO5AeQ1fOO2XLnPXJpIMz0K9HDEawPjpBA1N_6Ilu9Q-Qx779h5pH-K7q3xH3D8mnVO7kfpTYpUjM7FitA61reg7fOsYG00GysyVfG-lTHO8lKBa9R8KP8A95qRPVPVijfMfbLCsDBcs_uDzBPUj4uCvdrl_zD4VZftTGx9TuU54CJ7EH5tV861Z759awRLcY_nfEoxxxgtmMvX_r9voTd16ScFrH46aC0w7n4okl2e-prWNWaFbA-slrctNMm3MqtcX5tsW_UaUK79-u-0PDivPAV_CviUw',
      'authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyLnNoYWRtYW5AYmppdGdyb3VwLmNvbSIsInJvbGVzIjoiQWRtaW4iLCJwbGFucyI6IjMiLCJpYXQiOjE3MjMwOTEzMjIsImV4cCI6MTc1NDYyNzMyMn0.2SMg0TkGqVCMMmFvDGTXVH2kpcReaw_5kgqEZaIVr52cZh4YOqLMOr7eRMpcey_4DiTzo26nLh_I4vSndRB9fA',
      'cookie': 'ga=GA1.1.492130084.1715050676; legacy_auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.is.authenticated=true; auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.is.authenticated=true; legacy_auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.organization_hint=%22org_HeJkFwnF7vth0kpM%22; auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.organization_hint=%22org_HeJkFwnF7vth0kpM%22; ga_WBCCSLWJX2=GS1.1.1723087191.50.1.1723087817.0.0.0; XSRF-TOKEN=a795f597-9e08-44e5-9726-225265374d63',
      'priority': 'u=1, i',
      'referer': 'https://jp.qa-console-tc.pocketalk.com/devicelist',
      'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
      'x-xsrf-token': 'a795f597-9e08-44e5-9726-225265374d63'
    },
  };

  const response = http.get(url, params);

      // Parsing the JSON response
      let jsonResponse = JSON.parse(response.body);

      console.log(`statusCode: ${jsonResponse.statusCode}`);

      // Extracting the total device count
      let totalDeviceCount = jsonResponse.details.totalDeviceCount;
  
      // Printing the total device count to the console
      console.log(`Total Device Count: ${totalDeviceCount}`);
  
      // Assertions to check if the total device count matches the device count
      check(jsonResponse, {
          'Total device count is 14420': (r) => totalDeviceCount === 14420,
          'Device count is greater than 0': (r) => totalDeviceCount > 0,
      });
  
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDirectory = './HTML_device_founding_report';
  return {
      [`${outputDirectory}/CO_device_found_devices_VUs_1_${currentTime}.html`]: htmlReport(data),
  };
}
