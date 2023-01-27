const mongoose = require("mongoose");
const produitSchema = mongoose.Schema({
    
    Libelle:String,
    Prix:Number,
    Description:String,
    Quantite:Number

   
    },{timestamps: true});
module.exports = mongoose.model("Produit",produitSchema);
