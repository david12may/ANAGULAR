import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/producto';
import db from '../db/connection';


class Server {
    private app: Application;
    private port: string;

    constructor () {
        
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API working'
            })
        })
        this.app.use('/api/productos', routesProducto)
    }
    midlewares() {


        this.app.use(express.json());

        this.app.use(cors());
    }
    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error);
            console.log('Error al conectarse a la base de datos')
        }
        
    }

}

export default Server;