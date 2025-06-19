const url=require('url');

const myUrl=new URL('https://example.com:8080/path/name?search=query&sort=asc#section1')
console.log("HOST:",myUrl.host);
console.log("Pathname:",myUrl.pathname);
console.log("Query params:",myUrl.searchParams);
console.log("Hash:",myUrl.hash);
console.log("Search:",myUrl.search);
console.log("Port:",myUrl.port);
console.log("Protocol:",myUrl.protocol);
console.log("Href:",myUrl.href);
console.log("Hostname:",myUrl.hostname);
