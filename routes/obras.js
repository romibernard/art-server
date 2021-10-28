const express = require("express")
const router = express.Router()
const obrasController = require("./../controllers/obrasController")


// CRUD
router.get("/get-all", obrasController.getAllObras)

router.get("/obra/:id", obrasController.getObraById)

router.post("/create", obrasController.createObra)

router.put("/update", obrasController.updateObra)

router.delete("/delete", obrasController.deleteObra)



module.exports = router