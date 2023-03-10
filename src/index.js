const express = require('express')
const path = require('path');
const app = express();
const hbs = require("hbs");

require("./db/conn"); 
const register = require("./models/register");
const { registerHelper } = require('hbs');

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path)); //looks for index.html file
app.use(express.static('public/css'))
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res)=>{
    res.render("index");
}); //bydefault index page

app.get("/co",(req,res)=>{
    res.render("co");
})
app.get("/newop", (req,res)=>{
    res.render("newop");
});
app.get("/op",async (req,res)=>{
    res.render("op");
});

app.get("/level_buttons",async (req,res)=>{
    res.render("level_buttons");
});
app.get("/cpp1",async (req,res)=>{
    res.render("cpp1");
});
app.get("/resources_cpp1",async (req,res)=>{
    res.render("resources_cpp1");
});
app.post("/check",async(req,res)=>{
    try{
        const passsword = req.body.passsword;
        const email = req.body.email;
        const useremail = await register.findOne({email});
        if(useremail.password == passsword ){
            res.status(201).render("index");
        }else{
            res.send("invalid credantials");
        }
    }catch(error){
        res.status(400).send("invalid credantials");
    }
})
app.post("/add",async(req,res)=>{
    try{
        const password = req.body.password;
        const email = req.body.email;
        const name = req.body.name;
        const id = req.body.id;
        const proidnew = new register({
            id: id,
            name: name,
            email: email,
            password: password
        })
        const rregister = await proidnew.save();
        res.status(201).render("index");
    } catch(error){
        res.status(400).send(error);
    }  
})

app.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`);

})