const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  if (req.url == "/product" && req.method == "GET") {

    fs.readFile("db.json", "utf-8", (err, data) => {
      if (err) {
        res.end("error from server");
      } else {
        const DataObj = JSON.parse(data);
        res.end(JSON.stringify(DataObj));
      }
    });

  } else if (req.url == "/addproduct" && req.method == "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const newProduct = JSON.parse(body);

      fs.readFile("db.json", "utf-8", (err, data) => {
        if (err) {
          res.end("error from server");
        } else {
          const datafromdb = JSON.parse(data);
          let ProductID = datafromdb.product[datafromdb.product.length - 1]?.id || 0;

          const newSingleData = { ...newProduct, id: ++ProductID };
          datafromdb.product.push(newSingleData);

          fs.writeFile("db.json", JSON.stringify(datafromdb), (err) => {
            if (err) {
              res.end("error from writedata");
            } else {
              res.end("data added...");
            }
          });
        }
      });
    });

  }
  else if (req.url === "/delete" && req.method === "DELETE") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      const { id } = JSON.parse(body); // Get ID from body

      fs.readFile("db.json", "utf-8", (err, data) => {
        if (err) return res.end("Error reading db");

        const db = JSON.parse(data);
        const index = db.product.findIndex(p => p.id === id);

        
        if (index === -1) {
          return res.end("Product not found");
        }

        db.product.splice(index, 1);

        fs.writeFile("db.json", JSON.stringify(db), err => {
          if (err) return res.end("Error writing to db");
          res.end("Product deleted successfully.");
        });
      });
    });
  }
  else if (req.url == "/") {

    res.end("<h1>welcome to node project</h1>");

  } else {
    res.end("404 Page not Found");
  }

});

server.listen(8081, () => {
  console.log(">>>> server is running on port 8081 <<<<");
});