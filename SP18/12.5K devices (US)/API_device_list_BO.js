import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    vus: ['value==1'],
    iteration_duration: ['avg<40000', 'min<40000', 'med<40000', 'max<40000', 'p(95)<40000', 'p(90)<40000']
  }
}

export default function () {
  group("Testing PT Console API", function () {

    const params = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI2ODIxNjU0LCJpYXQiOjE3MjY3MzUyNTR9.KdH9va2OMB6E38skT4rtTi6cwNmf0DRzgUKWBeP2J28'
      },
      timeout: '1000000ms'
    };
    //console.log(formData);

    //sleep(30);

    group("Import data checking", function () {
      __ENV.imei = 543379977075017;
      //__ENV.company = "US Shadman Corp";
      let res = http.get(`https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/devicelist?searchText=${__ENV.imei}&currentPageNumber=0&rowLimitPerPage=100&colName=&sortDirection=&serverRegionIdList=`, params);
      let res1 = http.get(`https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/devicelist?searchText=&currentPageNumber=0&rowLimitPerPage=100&colName=&sortDirection=&serverRegionIdList=`, params);
      let res2 = http.get(`https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/devicelist?searchText=BJIT%20QA%20T%20CORP&currentPageNumber=0&rowLimitPerPage=100&colName=&sortDirection=&serverRegionIdList=`, params);

      console.log(`Response status: ${res.status}`);
      console.log(`Response body: ${res.body}`);
      //console.log(`Response body: ${res1.body}`);
      console.log(`Total devices: ${JSON.parse(res1.body).total_devices}`);
      console.log(`Total devices for US Shadman Corp: ${JSON.parse(res2.body).total_devices}`);
      console.log(`Response time: ${res.timings.waiting} ms`);
      console.log(`Load time: ${res.timings.duration} ms`);
      
      check(res, {
        'response status is 200': (r) => r.status === 200,
        'response body contains success=true': (r) => JSON.parse(r.body).success === true,
        'response body contains correct status': (r) => JSON.parse(r.body).status === 200,
        'response body contains result_code OK': (r) => JSON.parse(r.body).result_code === 'OK',
        'response body contains message OK': (r) => JSON.parse(r.body).message === 'OK',
        'response body contains total_devices 1': (r) => JSON.parse(r.body).total_devices === 1,
        'response body contains devices array': (r) => Array.isArray(JSON.parse(r.body).devices),
        'response body contains correct server_region': (r) => JSON.parse(r.body).devices[0].server_region === 'US'
      });
    });
  });
}

/*
export function handleSummary(data) {
  const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDirectory = './HTML_device_founding_report';
  return {
      [`${outputDirectory}/SP16_JP_html_report_5K_devices_VUs_1_search${currentTime}.html`]: htmlReport(data),
  };
}
  */
