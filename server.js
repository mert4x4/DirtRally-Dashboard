var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/data', function (req, res) {
  console.log(req.body);
  res.end();
});

app.listen(3000);