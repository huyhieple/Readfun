"use strict";
var express = require ("express");
var app = express();

var cors = require("cors");



app.listen(3000, function() {
    console.log("Server running @ http://localhost:3000")
});
// render đến readfun ---------------------------------------------
app.get ("/readfun", (req,res) => {
    res.render("readfun")
})
//ket noi voi MySQL ----------------------------------------------
var mysql = require("mysql2");
var db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "xxx",
        database: "readfun"
    }
)
    db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
  });
// API lấy danh sách thể loại -------------------------------------------

app.get("/get-categories", (req, res) => {
    db.query("SELECT type_name FROM theloai", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
        } else {
            res.json(results);
        }
    });
});
//-------------------------------------------------------------------
// upload file
var multer = require('multer');
var storage = multer .diskStorage(
    {
        destination: function(req,file,cb) {
            cb(null, './upload/');
        },
        filename: function(req,file,cb) {
            // cb(null,file.fieldname + '_' + Date.now());
            cb(null,file.originalname);
        }
    }
);
var upload = multer({ storage: storage});

app.get ('/uploadfile', function (req,res) {
    res.render('upload');
});
app.post ('/uploadfile', upload.single('f'), function (req, res) {
    console.log(req.file);
});

// Cau hinh ejs
app.set("view engine", "ejs");  // khai bao su dung ejs engine 
app.set("views", "./view");  // khai bao se su dung thu muc view nam trong duong dan ./view

app.get ("/huyhiep", (req,res) => {
    res.render("huyhiep");
}); 

// truyen tham so vao chitet.ejs thong qua index.js
app.get ("/chitiet", (req,res) => {
    res.render("chitiet", {hoten:"Le Huy Hiep"});
}); 

    // truyen mang
app.get ("/namsinh", (req,res) => {
    res.render("chitiet", {namsinh:[1976,1980,2003]});
});
var bodyParser = require ("body-parser");
const { render } = require("ejs");
//var urlencodePaser = bodyParser.urlencode({extended: false});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//app.use(bodyParser.urlencoded({extended: false}));
//route 
app.get ("/hello", function (req , res) {
    res.send("<p style = 'color:red'> Le Huy Hiep </p>");
});
app.post ("/hello", function (req , res) {
    res.send("<p style = 'color:red'> POST Le Huy Hiep </p>");
});

app.get ("/truyen/:id", (req,res) => {
    console.log(req); 
    console.log('-----------------------------------------------------------');
    let i = req.params.id;
    res.send('<p style="color:blue"> chapter thu: ' + i);
});

app.post("/login", urlencodedParser, (req,res) => {
    let user = req.body.username;
    let pass = req.body.password;
    res.send("username: "+ user +" password: "+ pass);
})