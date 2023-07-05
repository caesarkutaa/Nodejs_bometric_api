const express = require('express')
const bodyParser = require('body-parser');
const app = express();


// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + " not found" });
  });

require('./DB/db').connect()



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});