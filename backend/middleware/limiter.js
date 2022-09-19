const rateLimit = require("express-rate-limit")

// création d'un limite rate, qu'on basera sur le nombre de tentatives connexion
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: "Trop de tentatives de connexion. Compte bloqué pour 5 minutes"
})

module.exports = { limiter }