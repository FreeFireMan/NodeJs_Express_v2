/// session cookie Router hbs

let express = require('express');
let siteRouter = require('./routes/site');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars');
let app = express();

app.use(express.static(path.join(__dirname,'public','views')));
app.engine('.hbs',exphbs({
    extname : '.hbs',
    defaultLayout : path.join(__dirname,'public','views','layouts','main.hbs'),
    partialsDir : path.join(__dirname,'public','views','partial')
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'public','views'));

app.use(session({
    secret : 'keySession'
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user/',siteRouter);

app.get('/',function (req,res,netx) {
    req.session.myFild = 'myvariable';
    res.cookie('name','value',{maxAge:60*60*24*2});
     res.render('index');

});
app.get('/chek',function (req,res,netx) {
    console.log("Check = "+ req.session.myFild);
    console.log("Cookie = "+ req.cookies.name);
    res.render('index');

});
app.get('/clear',function (req,res,netx) {
    res.clearCookie();
    req.session.destroy();
    console.log('Cleared cookies and session');
    console.log('cookies ',+ req.cookies.name);
//    console.log('Cleared cookies and session');

    res.end();

});

app.get('/form',function (req,res,netx) {
 //   console.log("Output name from form");
   /* console.log(req.query.name);
    console.log(req.query.age);*/
    console.log("Form = "+ req.session.myFild);
    console.log("Cookie = "+ res.cookie('name'));
    res.render('data',{
        name: req.query.name,
        age: req.query.age,
        arr : [1,2,3,4],
        humans : [{
            name : 'Vasya',
            age: 30
        },
            {
                name : 'Irina',
                age: 38,
                selfish:{
                    name: 'kokos',
                    age: 23
                }
            }],
        show: false

    });

});
///-------------route-----------------------






app.listen(3000,function (err) {
    if (err){
        console.log(err);
    } else{
        console.log('Server runing');
    }
})
