const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  let urlReq, methodReq, dataRequest;
  const chunkArr = [];
  const dataResponse = {};

  urlReq = req.url;
  methodReq = req.method ?? "get";

  if (methodReq.toLowerCase() !== "post" || urlReq.toLowerCase() !== "/login") {
    dataResponse.data =
      "Silahkan akses endpoint /login dengan method post";
    return res.end(JSON.stringify(dataResponse));
  } else {
    req.on("data", (chunk) => {
      chunkArr.push(chunk);
    });
    req.on("end", () => {
      if (chunkArr.length !== 0) {
        dataRequest = Buffer.concat(chunkArr).toString();
        let requestObj = querystring.parse(dataRequest);
        dataResponse.data = requestObj;
      }
      let dataObj = JSON.stringify(dataResponse);
    //   console.log(dataObj)
      return res.end(dataObj);
    });
  }
  console.me();
});

server.listen(3000);
