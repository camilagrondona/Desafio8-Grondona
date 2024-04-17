import express from "express"
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./data/fs/productManager.js"

const app = express()

const port = 8080

const ready = console.log("Server ready on port " + port)

app.listen(port, ready)

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    try {
        const message = "Welcome to Coder-Server"
        return res.json({ status: 200, response: message })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, response: error.message })
    }
})

app.get("/products", read)
app.get("/products/:pid", readOne) // parámetro pid (product ID)

// Callback read (para leer todos los productos)

async function read(req, res) {
    try {
        const all = await getProducts()
        if (all.length > 0) {
            return res.json({ status: 200, response: all })
        } else {
            return res.json({ status: 404, response: "Not found" })
        }
    } catch (error) {
        console.log(error)
        return res.json ({status: 500, response: error.message})
    }
}
// Callback readOne (para leer un producto según su ID)

async function readOne(req, res) {
    try {
        const { pid } = req.params
        const one = await getProductById(pid)
        if (one) {
            return res.json ({status: 200, response: one})
        } else {
            const error = new Error ("Not found")
            error.status = 404
            throw error
        }
    } catch (error) {
        console.log(error)
        return res.json ({status: error.status || 500 , response: error.message || "Error"})
    }
}