import { productModel } from "../models/product.model.js"

const create = async (data) => {
    const product = await productModel.create(data) // data recibida del producto nuevo
    return product
}

const getAll = async (query, options) => {
    const products = await productModel.paginate(query, options)
    return products // retorna los productos encontrados
}
const getById = async (id) => {
    const product = await productModel.findById(id) // busca el producto por su id
    return product 
}

const update = async (id, data) => {
    const product = await productModel.findByIdAndUpdate(id, data, {new: true}) // la propiedad new true nos devuelve el producto actualizado 
    return product // lo devolvemos
}

const deleteOne = async (id) => {
    const product = await productModel.deleteOne({_id: id}) // le decimos que elimine el id de mongo que coincida con el id que le estoy enviando
    if (product.deletedCount === 0) return false // Si retorna false no se ha eliminado el producto
    return true // retornamos el true para que nos indique que la eliminación se realizó de forma correcta ya que no interesa enviar la información del producto eliminado 
}

export default {
    create,
    getAll,
    getById,
    update,
    deleteOne
}