const express = require('express')
const cors = require('cors');
const { USER_PATH } = require('../routes/endpoints');
const prisma = require( '../prisma/connection');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.connectionDB();
        //Middlewares
        this.middlewares();
        //rutas de app
        this.routes();
        
    }

    async connectionDB() {
        try {
            await prisma.$connect()
            console.log('bdd connected')
        } catch (error) {
            throw new Error( 'error to start');
        }
    }


    middlewares(){

        // CORS
        this.app.use(cors())

        //Lect y parseo de body, este midd es para formatear todas las peticiones http que vienen a json y poder recibirlo asi en el servidor
        
        this.app.use(express.json())
        
        // Directorio Publico
        this.app.use( express.static('public'))
    }

    // Routes por definir - Endpoints
    routes() { 

        this.app.use(USER_PATH, require('../routes/user.routes'))                  
    }


    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`server on in port: ${this.port}`)
        })
    }

}

module.exports = Server; 
