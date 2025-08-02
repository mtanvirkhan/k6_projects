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
        "groupId": 1640,
        "commonSettings": {
            "groupPin": "123453",
            "sleepTime": 15,
            "saveInLocalFlag": 1,
            "dataDeleteTime": 10,
            "mobileDataEditable": 1,
            "wifiEditable": 1,
            "wifiSettings": [
                {
                    "ssid": "GROUP",
                    "password": "123456790",
                    "securityType": 1,
                    "proxyType": 1,
                    "proxyHostName": "bjitgroup.com",
                    "proxyPort": "8080",
                    "bypassProxy": "1.1.1.1",
                    "pacUrl": "",
                    "wifiIPSettingType": 1,
                    "ipAddress": "1.1.1.1",
                    "gateway": "1.1.1.1",
                    "networkPrefixLength": "25",
                    "dns1": "1.1.1.1",
                    "dns2": "1.1.1.1",
                    "advanceOpt": true,
                    "isS2Series": false,
                    "settingType": "ADD",
                    "eapMethod": null,
                    "caDomainName": "",
                    "caUserPassword": "",
                    "identity": "",
                    "anonymousIdentity": "",
                    "deleteFlag": 0,
                    "groupInfoId": 1640,
                    "id": 0
                },
                {
                    "ssid": "GROUP1",
                    "password": "123456790",
                    "securityType": 1,
                    "proxyType": 1,
                    "proxyHostName": "bjitgroup.com",
                    "proxyPort": "8080",
                    "bypassProxy": "1.1.1.1",
                    "pacUrl": "",
                    "wifiIPSettingType": 1,
                    "ipAddress": "1.1.1.1",
                    "gateway": "1.1.1.1",
                    "networkPrefixLength": "25",
                    "dns1": "1.1.1.1",
                    "dns2": "1.1.1.1",
                    "advanceOpt": true,
                    "isS2Series": false,
                    "settingType": "ADD",
                    "eapMethod": null,
                    "caDomainName": "",
                    "caUserPassword": "",
                    "identity": "",
                    "anonymousIdentity": "",
                    "deleteFlag": 0,
                    "groupInfoId": 1640,
                    "id": 0
                },
                {
                    "ssid": "GROUP2",
                    "password": "123456790",
                    "securityType": 1,
                    "proxyType": 1,
                    "proxyHostName": "bjitgroup.com",
                    "proxyPort": "8080",
                    "bypassProxy": "1.1.1.1",
                    "pacUrl": "",
                    "wifiIPSettingType": 1,
                    "ipAddress": "1.1.1.1",
                    "gateway": "1.1.1.1",
                    "networkPrefixLength": "25",
                    "dns1": "1.1.1.1",
                    "dns2": "1.1.1.1",
                    "advanceOpt": true,
                    "isS2Series": false,
                    "settingType": "ADD",
                    "eapMethod": null,
                    "caDomainName": "",
                    "caUserPassword": "",
                    "identity": "",
                    "anonymousIdentity": "",
                    "deleteFlag": 0,
                    "groupInfoId": 1640,
                    "id": 0
                }
            ]
        },
        "remoteSettingModeId": 2
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imxja1QwTjZCNTV2ck1zRGRORElnQSJ9.eyJjdXN0b21lcl9uYW1lIjoiQkpJVCIsImlzcyI6Imh0dHBzOi8vY3Jvd24tZGV2LmpwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NmExMDgwYzBmNjZiMTEyYTM3MzQwNjciLCJhdWQiOlsiaHR0cHM6Ly9hcGkucG9ja2V0YWxrLmNvbSIsImh0dHBzOi8vY3Jvd24tZGV2LmpwLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjIzMzczMTcsImV4cCI6MTcyMjMzOTExNywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsIm9yZ19pZCI6Im9yZ185NU1LTDVDWk1MQTlCOEF2IiwiYXpwIjoiNWhOVlFlTkhCamdEcW11aFJ3WU4zclppeDQ0S0tUTTgifQ.VmRH1ZD-W_qIRUwqYX-Aazl0h7XG82nGJUOPmvpZMsfNyhinh84L07Kwn7MM0KVevXhB5F8Peap1LA7Ya1CVZ4CRpkPwNCDqLMdmF2IigzqgEhYQRgNVl4w7cAt2vF3QNYi1QZu55PAg1c1prmOhqiTX28mKRHDcWdVNItLji2aDieG1nxAaqbhPve2_yHXSbvsNp98OcPSMAOjW62yys9wD4n6ea2EdlnLQhHaDY2faPPJkWwVEcCESNsnSL6GwdMTcBvHeh72js3GoxgZ2pLpS7byrEN-WT9VGtnjYxkRULLDEu8phyq61_RnlpDv_-6UHn_SHFWFow7QY8E07Ew',
        'authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTcyMjMzNzMxOCwiZXhwIjoxNzUzODczMzE4fQ.hpvvyKCLMP_03mQVkT4s5D7NEyWrcr3_BXkr6eZ4ZO_9Q2RZLrEZHtqszo2Jg-mYvCZZC9cEsy4QOE5IZ7sdGQ',
        'cookie': '_ga=GA1.1.1451134549.1722002757; _legacy_auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.is.authenticated=true; auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.is.authenticated=true; _legacy_auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.organization_hint=%22org_95MKL5CZMLA9B8Av%22; auth0.5hNVQeNHBjgDqmuhRwYN3rZix44KKTM8.organization_hint=%22org_95MKL5CZMLA9B8Av%22; XSRF-TOKEN=bc79860d-7cc6-419f-8788-fb3f97e1c7f8; _ga_WBCCSLWJX2=GS1.1.1722335354.12.1.1722335384.0.0.0',
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
