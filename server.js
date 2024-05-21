const http = require('http');
const fs = require("fs");
const fileContents = fs.readFileSync("./index.html");

function getContentType(fileName) {
  const ext = fileName.split("")[1];

  let contentType = "text/plain";

  switch (ext) {
    case "jpg":
    case "jpeg":
      contentType = "image/jpeg";
      break;
    case "png":
      contentType = "image/png";
      break;
    case "css":
      contentType = "text/css";
      break;

    default:
      contentType = "text/plain";
      break;
  }
  return contentType;
}

const server = http.createServer((req, res) => {

  if(req.method === "GET" && req.url === '/') {
    res.statusCode === 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(fileContents);
  };

  if(req.method === "GET" && req.url.startsWith("/static")) {
    const assetPath = req.url.split("/static")[1]; // css/application.css

    try{
      const resBody = fs.readFileSync("./assets" + assetPath);

      res.statusCode = 200;
      res.setHeader("Content-Type", getContentType(assetPath));
      res.end(resBody);
      return;

    } catch{
      console.error("Cannot find asset", assetPath, "in assets folder");
      res.statusCode = 404;
      return res.end();
    }


  }

});

const port = 5001;

server.listen(port, () => console.log('Server is listening on port', port));
