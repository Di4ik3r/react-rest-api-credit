let express = require('express');
let path = require('path'); // модуль для парсинга пути
let app = express();
let log = require("./libs/log")(module)
let config = require('./libs/config');
var cors = require('cors')

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// // app.use(express.static(path.join(__dirname, "public"))); 
// запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
// });

app.use(cors())
  
  

app.get('', function (req, res) {
	res.send('API is running');
});

app.listen(config.get("port"), function(){
	console.log(`Express server listening on port ${config.get("port")}`);
});


app.get('/ErrorExample', function(req, res, next){
	next(new Error('Random error!'));
});


const personRouter = require("./routes/personRouter")
app.use("/api/persons", personRouter)

const penaltyRouter = require("./routes/penaltyRouter")
app.use("/api/penalties", penaltyRouter)

const creditTypeRouter = require("./routes/creditTypeRouter")
app.use("/api/credit-types", creditTypeRouter)

const creditRouter = require("./routes/creditRouter")
app.use("/api/credits", creditRouter)

app.options('*', cors())

// app.use(cors())