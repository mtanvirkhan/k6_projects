import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//console.log(csvData);

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
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzIzNjkyNzY1LCJpYXQiOjE3MjM2MDYzNjV9.n7PJwdJ8wOXI6wqvdY9cJ3oYVEEq_WetfgsBygDfN7w'
      },
      timeout: '1000000ms'
    };
    //console.log(formData);

    sleep(30);

    group("Translation data upload checking", function () {
      __ENV.imei = 788877001904987;
      let res = http.get(`https://qa-global-consolebk.pocketalk.com/iotconsoleapi-global-bo/api/private/devicelist?searchText=${__ENV.imei}&currentPageNumber=0&rowLimitPerPage=100&colName=&sortDirection=&serverRegionIdList=`, params);

      console.log(`Response status: ${res.status}`);
      console.log(`Response body: ${res.body}`);
    
      
      check(res, {
        'response status is 200': (r) => r.status === 200,
        'response body contains success=true': (r) => JSON.parse(r.body).success === true,
        'response body contains correct status': (r) => JSON.parse(r.body).status === 200,
        'response body contains result_code OK': (r) => JSON.parse(r.body).result_code === 'OK',
        'response body contains message OK': (r) => JSON.parse(r.body).message === 'OK',
        'response body contains total_devices 1': (r) => JSON.parse(r.body).total_devices === 1,
        'response body contains devices array': (r) => Array.isArray(JSON.parse(r.body).devices),
        'response body contains correct device_id': (r) => JSON.parse(r.body).devices[0].device_id === 2147506851,
        'response body contains correct product_type': (r) => JSON.parse(r.body).devices[0].product_type === 'POCKETALK S PLUS',
        'response body contains correct corp_info_id': (r) => JSON.parse(r.body).devices[0].corp_info_id === 405,
        'response body contains correct company': (r) => JSON.parse(r.body).devices[0].company === 'BJIT_Tanvir',
        'response body contains correct imei1': (r) => JSON.parse(r.body).devices[0].imei1 === `${__ENV.imei}`,
        'response body contains correct status': (r) => JSON.parse(r.body).devices[0].status === 'Mode instruction sent',
        'response body contains correct color_code_name': (r) => JSON.parse(r.body).devices[0].color_code_name === 'GRAY',
        'response body contains correct suspension_flag': (r) => JSON.parse(r.body).devices[0].suspension_flag === 0,
        'response body contains correct server_region': (r) => JSON.parse(r.body).devices[0].server_region === 'JP',
        'response body contains correct sales_region': (r) => JSON.parse(r.body).devices[0].sales_region === 'JP',
      });
    });
  });
}

export function handleSummary(data) {
  const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDirectory = './HTML_device_founding_report';
  return {
      [`${outputDirectory}/html_report_1000_devices_VUs_1_search${currentTime}.html`]: htmlReport(data),
  };
}
