const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
const textract = require("textract");

app.use(cors());
app.use(bodyParser.json());

function getArticle(url, req, res) {
  textract.fromUrl(url, function(error, text) {
    if (text) {
      res.send(text);
    } else {
      console.log(error);
      res.send("URL Error");
    }
  });
}

app.post("/", (req, res) => {
  getArticle(req.body.text, req, res);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
