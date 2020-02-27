let express = require('express');
let path = require('path'); // модуль для парсинга пути
let app = express();
let log = require("./libs/log")(module)
let config = require('./libs/config');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

app.get('', function (req, res) {
    res.send('API is running');
});

app.listen(config.get("port"), function(){
    console.log(`Express server listening on port ${config.get("port")}`);
});

// app.use(function(req, res, next){
//     res.status(404);
//     log.debug('Not found URL: %s',req.url);
//     res.send({ error: 'Not found' });
//     return;
// });

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

// app.get('/pizzas', function(req, res) {
//     res.send('This is not implemented now');
// });

// app.post('/pizzas', function(req, res) {
//     res.send('This is not implemented now');
// });

// app.get('/pizzas/:id', function(req, res) {
//     res.send('This is not implemented now');
// });

// app.put('/pizzas/:id', function (req, res){
//     res.send('This is not implemented now');    
// });

// app.delete('/pizzas/:id', function (req, res){
//     res.send('This is not implemented now');
// });


let PizzaModel = require('./libs/db').PizzaModel;

app.get('/pizzas', function(req, res) {
    return PizzaModel.find(function (err, pizzas) {
        if (!err) {
            return res.send(pizzas);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/pizzas', function(req, res) {
    console.log(req.params)
    let pizza = new PizzaModel({
        name: req.body.name,
        cheese: req.body.cheese,
        tomato: req.body.tomato,
        meat: req.body.meat,
    });

    pizza.save(function (err) {
        if (!err) {
            log.info("pizza created");
            return res.send({ status: 'OK', pizza:pizza });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

app.get('/pizzas/:id', function(req, res) {
    return PizzaModel.findById(req.params.id, function (err, pizza) {
        if(!pizza) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', pizza:pizza });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.put('/pizzas/:id', function (req, res){
    return PizzaModel.findById(req.params.id, function (err, pizza) {
        if(!pizza) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        pizza.name = req.body.name;
        pizza.tomato = req.body.tomato;
        pizza.cheese = req.body.cheese;
        pizza.meat = req.body.meat;
        return pizza.save(function (err) {
            if (!err) {
                log.info("pizza updated");
                return res.send({ status: 'OK', pizza:pizza });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

app.delete('/pizzas/:id', function (req, res){
    return PizzaModel.findById(req.params.id, function (err, pizza) {
        if(!pizza) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return pizza.remove(function (err) {
            if (!err) {
                log.info("pizza removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});
