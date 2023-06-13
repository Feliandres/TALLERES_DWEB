
// IMPORTACION DE PASSPORT
const passport = require('passport')

// IMPORTACION DEL MODELO USER
const User = require('../models/User')

// IMPORTACION DE ESTRATEGIA
const LocalStrategy = require('passport-local').Strategy

// CONFIGURACION DE LA ESTRATEGIA
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{

    // TRAER EL USUARIO EN BASE AL EMAIL 
    const userBDD = await User.findOne({email})

    // VALIDACION DEL USUARIO
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)

    // VALIDACION DE PASSWORD
    const passwordUser = await userBDD.matchPassword(password)

    // VALIDACION DEL PASSWORD DEL FORMULARIO VS EL DE LA BDD
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)

    // RETORNAR EL USUARIO
    return done(null,userBDD)
}))


// SERIALIZACION DEL USUARIO
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// DESERIALIZACION DEL USUARIO
passport.deserializeUser(async (id, done) => {

    // TRAER EL USUARIO EN BASE AL ID DE LA SESION
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});