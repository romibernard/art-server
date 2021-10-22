const express = require("express")
const router = express.Router()
const obrasController = require("./../controllers/obrasController")


// CRUD
// GET todas las obras
router.get("/get-all", obrasController.getAllObras)

router.get("/obra/:id", obrasController.getObraById)

// POST crear obra
router.post("/create", obrasController.createObra)
// PUT actualizar obra
router.put("/update", obrasController.updateObra)
//DELETE borrar obra
router.delete("/delete", obrasController.deleteObra)



module.exports = router