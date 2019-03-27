// server.ts
import * as express from "express";
// @ts-ignore
const app = express();
const multer = require('multer');
const gm = require("gm")
const fs = require('fs');
// @ts-ignore
const storage = multer.diskStorage({
    destination: __dirname + "/not_processed_files/",
    // @ts-ignore
    filename: function (req,file,cb) {
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage});
app.use("/files",express.static(__dirname+"/files"));

// @ts-ignore
// app.post('/file ', upload.single(''), function (req, res,next) {
//
//     // @ts-ignore
//     gm('not_processed_files/'+req.file.filename).resize(720, null).noProfile().write(__dirname+"/files/"+"sm_"+req.file.originalname,
//              function (err: any) {if (!err) console.log('done');else console.log("error");})
//     // @ts-ignore
//     gm('not_processed_files/'+req.file.filename).resize(1280, null).noProfile().write(__dirname+"/files/"+"med_"+req.file.originalname,
//         function (err: any) {if (!err) console.log('done');else console.log("error");});
//     // @ts-ignore
//     gm('not_processed_files/'+req.file.filename).resize(1920, null).noProfile().write(__dirname+"/files/"+"big_"+req.file.originalname,
//         function (err: any) {if (!err) console.log('done');else console.log("error");});
//     // @ts-ignore
//     gm('not_processed_files/'+req.file.filename).noProfile().write(__dirname+"/files/"+"ori_"+req.file.originalname,
//         function (err: any) {if (!err) console.log('done');else console.log("error");});res.status(200).send("ok");
// });

// @ts-ignore
app.use("/files", express.static(__dirname + "/files"));
// @ts-ignore
app.post('/file', upload.single(''), function (req, res, next) {
    // @ts-ignore
    gm('not_processed_files/' + req.file.filename).resize(720, null).noProfile().write(__dirname + "/files/" + "sm_" + req.file.originalname, function (err) {
        if (!err)  console.log('done');else console.log(err);
    });
    gm('not_processed_files/' + req.file.filename).resize(1200, null).noProfile().write(__dirname + "/files/" + "med_" + req.file.originalname, function (err) {
        if (!err)  console.log('done');else console.log(err);
    });
    gm('not_processed_files/' + req.file.filename).resize(1920, null).noProfile().write(__dirname + "/files/" + "big_" + req.file.originalname, function (err) {
        if (!err)  console.log('done');else console.log(err);
    });
    gm('not_processed_files/' + req.file.filename).resize(null, null).noProfile().write(__dirname + "/files/" + "ori_" + req.file.originalname, function (err) {
        if (!err)  console.log('done');else console.log(err);
    });
res.sendFile(__dirname + "/index.html");	    res.status(200).send("ok");
});



app.get('/', function (req: express.Request, res: express.Response) {
    res.send("Hallo Welt♥");
});


app.listen(process.env.PORT || 80, function () {
    console.log("Server listens on port " + 80);
});