//CRUD de Obras
const Obra = require('./../models/Obras')

exports.getObraById = async (req, res) => {
    const { id } = req.params;
    console.log(getObraById, id)
    try {
        const obraSelected = await Obra.findById({ _id: id });
        console.log("obraSelected", obraSelected)
        return res.json({
            data: obraSelected
        })
    } catch (error) {
        //console.log(“Error: “, error)
        return res.status(500).json({
            data: null
        })
    }
}


exports.getAllObras = async (req, res) => {
    try {
        const obra = await Obra.find({})
        console.log(obra)
        return res.json({
            data: obra
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            errorMsg: "Se presentó un error interno. Estamos arreglándolo lo más pronto posible."
        })
    }
    res.json({
        data: "Artempo art"
    })
}


exports.createObra = async (req, res) => {
    //Recabar datos formulario
    const {
        name,
        picturesUrl,
        sizeH,
        sizeW,
        sizeP,
        materials,
        availableForSale,
        price,
        autor,
        contact
    } = req.body

    try {
        const newObra = await Obra.create({
            name,
            picturesUrl,
            sizeH,
            sizeW,
            sizeP,
            materials,
            availableForSale,
            price,
            autor,
            contact
        })
        res.json({
            data: newObra,
            msg: "Creación de obra exitosa."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errormsg: "Hubo un error al crear la obra."
        })
    }
}


exports.updateObra = async (req, res) => {
    const {
        id,
        name,
        picturesUrl,
        sizeH,
        sizeW,
        sizeP,
        materials,
        availableForSale,
        price,
        autor,
        contact
    } = req.body

    try {
        const updatedObra = await Obra.findByIdAndUpdate(id, {
            id,
            name,
            picturesUrl,
            sizeH,
            sizeW,
            sizeP,
            materials,
            availableForSale,
            price,
            autor,
            contact
        }, { new: true })
        return res.json({
            data: updatedObra
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msgError: "Error actualizando la obra."
        })
    }
}


exports.deleteObra = async (req, res) => {
    const { id } = req.body
    try {
        const deletedObra = await Obra.findByIdAndRemove({ _id: id })
        return res.json({
            data: deletedObra,
            msg: "Eliminación de obra exitosa."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msgError: "Error borrando la obra."
        })
    }
}

