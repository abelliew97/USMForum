const express = require("express")
const app = express()
const PORT = process.env.PORT || 5001
const mongoose = require("mongoose")
const { MONGOURI } = require("./key")
var bodyParser = require('body-parser')



mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", err => {
  console.log(err);
});

require("./models/user");
require("./models/post");
require("./routes/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));


//Text fix
// app.use(express.static(__dirname + '/public'));

// app.use(bodyParser.urlencoded({
//    extended: false
// }));

// app.use(bodyParser.json());



app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
