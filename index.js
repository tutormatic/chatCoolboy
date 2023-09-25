const http = require('http');
const fs = require("fs");

const css = fs.readFileSync("./website/style.css");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.readFile("./website/index.html", "utf-8", (err, data) => {
      const variable = data.match(/\#\{(.*)\}/);
      if (variable) {
        res.end(data.replace(variable[0], eval(variable[1])));
      } else {
        res.end(data);
      }
    });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});