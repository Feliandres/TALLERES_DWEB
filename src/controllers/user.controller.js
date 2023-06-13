const User = require('../models/User')
const passport = require("passport")




const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

// FUNCION PARA REGISTRAR UN NUEVO USUARIO
const registerNewUser = async(req,res)=>{

    // DESESTRUCTURAR LOS DATOS DEL FORMULARIO
    const{name,email,password,confirmpassword} = req.body
    
    // VALIDACION DE CAMPOS
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")

    // VALIDACION DE CONTRASEÑAS
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    // TRAER EL USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")

    // GUARDA EL REGISTRO EL LA BDD
    const newUser = await new User({name,email,password,confirmpassword})
     
    // ENCRIPTA EL PASSWORD
    newUser.password = await newUser.encrypPassword(password)

    // GUARDAR EL USUARIO
    newUser.save()

    // REDIRECCIONAR AL LOGIN
    res.redirect('/user/login')
}

const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

const logoutUser =(req,res)=>{
    res.send('logout user')
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}

