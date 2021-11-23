import { IController } from '../interfaces/IController';
import express from 'express';
import QuasarFire from '../business/QuasarFire';

class QuasarFireController implements IController {

    public router = express.Router();
    quasarFire = new QuasarFire();

    constructor() {
        this.InitializeRoutes();
    }

    /**
     * Initialize the controllers routes
     */
    InitializeRoutes() {
        this.router.post("/topsecret", this.GetLocation);

    }

    /**
     * Get Location
     * @param req Request
     * @param res Response
     */
    private GetLocation(req: express.Request, res: express.Response) {
        let quasarFire = new QuasarFire();

        // let distances = new Array(2.83, 2.83, 2.83);
        let distances = new Array(86.814, 69.409, 55.448);

        quasarFire.GetLocation(distances)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(404).send("Error al procesar localización");
            })

    }
}

export default QuasarFireController;