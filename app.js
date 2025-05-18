const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

var routes = require('./routes');

var MemoryStore = session.MemoryStore;
app.use(session({
    secret: 'NutechIntegrasi',
    rolling: false,
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true,
    cookie: { maxAge: 7200000, httpOnly: true }
}));

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

// Routes
app.use('/api', routes);

app.use(express.static(__dirname + '/public'));

// Start server
app.listen(PORT, () => {
  console.log(`Nutech Integrasi now is Running`);
});