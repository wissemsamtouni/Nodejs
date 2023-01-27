var express = require("express");
const produitsModel = require("../models/produit");
var router = express.Router();

router.get("/listeProduit", async function (req, res, next) {
  try {
    const produits = await produitsModel.find({});
    res.render("listeProduit", { title: "liste Des produits", cont: produits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/addProduct", function (req, res, next) {
  res.render("addProduct");
});

router.post("/addProduct", async function (req, res, next) {
  try {
    const { Libelle, Prix, Description, Quantite } = req.body;
    const checkIfProductExists = await produitsModel.findOne({
      Libelle: Libelle,
    });
    if (checkIfProductExists) {
      res.send("libelle already exists");
    } else {
      const newProduct = new produitsModel({
        Libelle: Libelle,
        Prix: Prix,
        Description: Description,
        Quantite: Quantite,
      });
      await newProduct.save();
      res.redirect("/produits/listeProduit");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// router.post("/addProduct", async function (req, res, next) {

//   try {
//     const { Libelle, Prix,Description,Quantite } = req.body;
//     const checkIfUserExists = await produitsModel.findOne({
//       Libelle: Libelle,
    
//     });
//     if (checkIfUserExists) {
//       res.send("Produit already exists");
//     } else {
//       const newProduct = new produitsModel({
//         Libelle : Libelle,
//       Prix : Prix,
//       Description:Description,
//       Quantite: Quantite,
//       });
//       await newUser.save();
//       res.redirect("/produits/listeProduit");
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
router.get("/delete/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const checkIfExist = await produitsModel.findById(id);
    if (!checkIfExist) {
      throw new Error("produits not found");
    }
    await produitsModel.findByIdAndDelete(id);
    res.redirect("http://localhost:3000/produits/listeProduit");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const produits = await produitsModel.findById(id);
    if (!produits) {
      throw new Error("produits not found");
    }
    res.render("modifier", { title: "Modifier le  produit", cont: produits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/edit/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { Libelle, Prix, Description, Quantite } = req.body;
    const produits = await produitsModel.findByIdAndUpdate(id, {
      Libelle,
      Prix,
      Description,
      Quantite,
    });
    if (!produits) {
      throw new Error("Error while updating produits");
    }
    res.redirect("/produits/listeProduit");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
