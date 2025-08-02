import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

//console.log(csvData);

export const options = {
    vus: 1,
    iterations: 1
}

export default function () {
  group("Testing PT Console API", function () {

    const params = {
      headers: {
        'Authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbmFtdWwuaGFzYW5AYmppdGdyb3VwLmNvbSIsInJvbGVzIjoiQWRtaW4iLCJwbGFucyI6IjEiLCJpYXQiOjE3MjIwMDI4MjksImV4cCI6MTc1MzUzODgyOX0.csMMCKzslQdnIiMD-MS3mqIvc-ozs87VPCFySQjQhr9k7sox3zUwIMR6iUE4KV2ZS1B5t1DqaNDv6uGRkCGbWg',
        'Auth0-Authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imxja1QwTjZCNTV2ck1zRGRORElnQSJ9.eyJjdXN0b21lcl9pZCI6IjEyMzQ1Njc4OTAxMjM0NTY3OCIsImN1c3RvbWVyX25hbWUiOiJmc2ktZGV2IiwiYWRtaW5fZW1haWwiOiJreW9zdWtlLndha3VpQHBvY2tldGFsay5jb20iLCJpc3MiOiJodHRwczovL2Nyb3duLWRldi5qcC5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjY4YjcxYzMyYWU4MGViYThiMTJlNmYyIiwiYXVkIjpbImh0dHBzOi8vYXBpLnBvY2tldGFsay5jb20iLCJodHRwczovL2Nyb3duLWRldi5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzIyMDcyNDkyLCJleHAiOjE3MjIwNzQyOTIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfNmJlZzBGMHkwbjh5ZUJqcCIsImF6cCI6IjVoTlZRZU5IQmpnRHFtdWhSd1lOM3JaaXg0NEtLVE04In0.UoNLkYT4kNafJIT0-To_U1tpZk8UgHSXDiJSmCpmeUje8nSLXOC4QTASzq1AyT_1D0VCGlEcBh_KALWm7gfrUsXQH27-XAw9CcNLmFeINxb_kAHxbMLuH4kd4CeqyxZRlZjC76lUYg2lzRK3ldyuyLnlntOyITWU3fjk18vQUBC4-yAakhZC8inBX6QsTKqAyptsEgvhTXr4T6B5vAnR3vXuKY70oFF4Z9a72SALCOCAmvXik9MzxFNE-oRc6iV3Ck5UQPWi9m3FFW-bRiw69zQvGT8VuTtutLuiCnYppTBiZp6rWpf8a3sFNT0DgE-F_Z39zpXnEJZRIRipr87H7Q'
      },
      timeout: '1000s'
    };
    //console.log(formData);

    sleep(30);

    group("Translation data upload checking", function () {
      let res = http.get("https://jp.qa-console-tc.pocketalk.com/iotconsoleapi-co/api/private/translation-history-list?imei=767777002910003&from=2024-07-01T00:00:00Z&to=2024-07-27T23:59:59Z", params);

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
