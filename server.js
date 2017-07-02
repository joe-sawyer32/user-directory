const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const mustacheExpress = require("mustache-express");
const data = require(path.join(__dirname, "/data.js"));

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "/views"));

app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/", function(request, response) {
  // response.send(data);
  response.render("index", { userList: data });
});

app.get("/user/:id", function(request, response) {
  var userProfile = data[request.params.id - 1];
  response.send(userProfile);
  // response.render("user", { user: userProfile });
});

app.listen(port, function() {
  console.log("Spinning with express: Port", port);
});
