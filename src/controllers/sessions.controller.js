import { userResponseDto } from "../dto/user-response.dto.js"
import { createToken } from "../utils/jwt.js"

// En este controller no hay ningún llamado a la base de datos, ya que esta conexión se hace en passport config (estrategias de autenticación y registro). Por eso no hace falta tampoco tener servicios. En caso de que el passport creciera mucho, se puede desarrollar la lógica de las estrategias en un servicio. 

const register = async (req, res) => {
    try {
        res.status(201).json({ status: "success", message: "Usuario creado con éxito" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Error", message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const user = req.user
        const token = createToken(user) // Creamos el token
        res.cookie("token", token, {httpOnly: true}) // Guardamos el token en una cookie. 1er parametro: nombre de la cookie (token) // 2do parámetro: pasamos la info del token // 3er parámetro: a la cookie solo se puede acceder con una petición http
        const userDto = userResponseDto(user) // usamos el dto con los datos del usuario que queremos que retorne para que no nos dé toda la información completa en la response
        return res.status(200).json({ status: "success", payload: userDto, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Error", message: "Internal Server Error" })
    }
}

const current = async (req, res) => {
    try {
        const user = userResponseDto(req.user) // El DTO filtra la info del usuario
        return res.status(200).json({ status: "Success", payload: user }) // Si pasa las verificaciones nos devuelve los datos del usuario filtrado por el DTO
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Error", message: "Internal Server Error" })
    }
}

const loginGoogle = (req, res) => {
    try {
        return res.status(200).json({ status: "success", payload: req.user }) // En caso de pasar la verificación, devolvemos la info que tenemos del token
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Error", message: "Internal Server Error" })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy() // Cerrar la sesión 
        res.status(200).json({ status: "Success", message: "Sesión cerrada con éxito" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Error", message: "Internal Server Error" })
    }
}

export default {
    register,
    login, 
    current, 
    loginGoogle,
    logout
}