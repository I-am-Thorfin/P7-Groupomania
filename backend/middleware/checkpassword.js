
const passwordValidator = require("password-validator");

//création du schema
let checkPasswordSchema = new passwordValidator();

//le schéma impose plusieurs conditions de validation pour le mot de passe
checkPasswordSchema
  .is()
  .min(8) // Minimum  8 caractères
  .is()
  .max(25) // Max 25 caractères
  .has()
  .uppercase(1) // Doit avoir au moins 1 majuscule
  .has()
  .lowercase() // Doit avoir des lettres minuscules
  .has()
  .digits(2) // Doit avoir au moins 2 chiffres
  .has()
  .not()
  .spaces() // Ne doit pas comporter d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Mettre ces valeurs sur liste noire

//Vérification de la qualité du password par rapport au schema
module.exports = (req, res, next) => {
  // Si le mdp correspond, nous passons à l'execution suivante
    if (checkPasswordSchema.validate(req.body.password)) {
    next() 
  }

  else {
    return res.status(403).json({error : `Le mot de passe n'est pas assez fort. Il doit contenir au moins 8 caractères, parmis lesquels au moins 1 majuscule et 2 chiffre`})       
  }
};