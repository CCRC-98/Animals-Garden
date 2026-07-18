//  Importacion de modulos y dependencias
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');

const adminRoutes = require('./routes/admin.routes.js');
const vetRoutes = require('./routes/vet.routes.js');
const userRoutes = require('./routes/user.routes.js');

const authRoutes = require('./routes/auth.routes.js');
const aboutUsRoutes = require('./routes/aboutUs.routes.js');
const pqrsRoutes = require('./routes/pqrs.routes.js');

const authControllers = require('./controllers/auth.controller.js');
const authMiddlewares = require('./middlewares/auth.middlewares.js');



//  Inicializacion de la aplicacion
const app = express();


//  Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://cdn.startbootstrap.com https://ajax.googleapis.com");
    next();
  });
  


//  Configuraciones motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: '',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./libs/handlebars.js')
}));
app.set('view engine', '.hbs');


//  Public
app.use(express.static(path.join(__dirname, 'public')));


//  Ruta principal
app.get('/', (req, res) => {
    res.status(200).render('index/index');
});


//  Rutas externas
app.use('/signIn', authRoutes);
app.use('/aboutUs', aboutUsRoutes);
app.use('/createPQRS', pqrsRoutes);

app.use('/admin', authControllers.isAuthenticated, authMiddlewares.verifyToken, adminRoutes);
app.use('/vet', authControllers.isAuthenticated, authMiddlewares.verifyToken, vetRoutes);
app.use('/user', authControllers.isAuthenticated, authMiddlewares.verifyToken, userRoutes);


//  Limpiador de cache
app.use(function (req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
        res.sendStatus(401);
    } else {
        next();
    }
});


module.exports = app;