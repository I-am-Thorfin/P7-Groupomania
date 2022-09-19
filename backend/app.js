const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require("path");
const app = express();

const helmet = require('helmet');


const dotenv = require("dotenv");
console.log("FROM ./APP --- /DOTENV : ", dotenv);
const result = dotenv.config();
console.log("FROM ./APP --- RESULT : ", result);


/* Correction de l'erreur de CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());

/* Fonction pour régler l'erreur causée par Helmer au niveau des images */
app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
})
app.disable('x-powered-by');



app.use(express.json()) //Pour formater le tout en json afin que le code soit lisible.
app.use('/api/auth', userRoutes); // Pour pointer vers la route User
app.use('/api/sauces', sauceRoutes); // Pour pointer la route sauce
app.use('/images', express.static(path.join(__dirname, `images`))); // Pour faire fonctionner multer



/* Appel de Mongoose */
 mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clusterpiquante.g6rxl.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




module.exports = app;