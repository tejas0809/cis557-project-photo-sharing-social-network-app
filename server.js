var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var multer  = require('multer');

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// run angular program in static client folder
app.use(express.static(path.join(__dirname, 'client')));

// start node server on port 8000
// http://localhost:8000
app.set('port', process.env.PORT || 8000);

// use multer to upload file
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "")  + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

// create "uploadfile" API on server 
app.post('/uploadfile', upload.single('file'), function(req,res,next){
    console.log('Upload Successful ', req.file, req.body);
});

// listen to port define above
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server port ' + app.get('port'));
});
