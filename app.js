//Importancion de modulos necesarios para hacer la conexion a la base de datos y al webpack y unir el login y registro con el ajedrez
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./src/models/user'); //Importacion del modelo de usuario

//Creacion de la aplicacion Express, sin express no podriamos hacer la conexion entre nuestro webpack que es el ajedrez y nuestra base de datos con el login
const app = express();
const mongo_uri = 'mongodb://localhost:27017/proyecto_final_login'; //URI de MongoDB donde se encuentra la base de datos donde se almancenan los registros


//Metodo para lograr la conexion con nuestra base de datos en MongoDB
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Successfully connected to ${mongo_uri}`);
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


//Configuraicon de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));



//Configuracion de sesion
app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


//Esto sirve para archivos estaticos desde webpack, sin esta sentencia no podriamos conectar webpack con nuestro index
app.use(express.static(path.join(__dirname, 'src', 'public')));


// Middleware para verificar la sesión del usuario
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); //Continuar si el usuario esta autenticado
    } else {
        res.redirect('/login'); // Redigirge al login si el usuario no esta autenticado
    }
}

// Ruta para servir el formulario de inicio de sesión
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'login.html'));
});

// Ruta para manejar el inicio de sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user; // Guardar información del usuario en la sesión
            res.redirect('/'); // Redirige a la página del juego de ajedrez si las credenciales son correctas
        } else {
            res.status(401).send('Usuario mal logueado'); // Mensaje de error si las credenciales son incorrectas
        }
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});


app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html')); // Asegúrate de tener un archivo index.html en public
});

// Ruta raíz redirige al login
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'register.html'));
});

//Ruta para manejar el registro de usuarios
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        //Generar el hash de la contraseña en MongoDB
        const hashedPassword = await bcrypt.hash(password, 10);
        //Crear un nuevo usuario con le nombre de usuario y la contraseña hash
        const user = new User({ username, password: hashedPassword });
        //Guardar el usuario en la base de datos
        await user.save();
        res.redirect('/login'); // Redirigir al login después del registro exitoso
    } catch (error) {
        res.status(500).send('Error al registrar al usuario');
    }
});

//Iniciar el servidor en un puerto 3000
app.listen(3000, () => {
    console.log('server started on port 3000');
});

//Exportar la aplicacion Express
module.exports = app;