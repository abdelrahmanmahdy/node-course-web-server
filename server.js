const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public/'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path} ${JSON.stringify(req.params)}`;
    console.log(log);

    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err)
        console.log('unable to append to server.log!');
    });
    next();

})

app.get('/',(req,res)=>{
    // res.send('<h1>Hello, Express!</h1>');
    // res.send({
    //     name: 'Homie',
    //     likes:[
    //         'anime',
    //         'photography',
    //         'pizza'
    //     ]
    // });
    res.render('welcome.hbs',{
        pageTitle:'Home Page',
        someMsg:'welcome to hbs demo, wuba luba dub dub!',
        author:'Homie-san'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        author:'Homie-san',
        someMsg:'This is a message please do not freak out or kill yourself, actually kill yourself!'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        status_code:404,
        message: 'bad request!'
    });
})

app.listen(3000);