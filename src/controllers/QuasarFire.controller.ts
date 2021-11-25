import { IController } from '../interfaces/IController';
import express from 'express';
import QuasarFire from '../business/QuasarFire';
import Satellite from 'dtos/Satellite.dto';

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
        this.router.post("/topsecret", this.GetLocationAndMessage);
    }

    /**
     * Get Location and Message from Imperial Ship
     * @param req Request
     * @param res Response
     */
    private GetLocationAndMessage(req: express.Request, res: express.Response) {
        // let distances = new Array(2.83, 2.83, 2.83);
        //let distances = new Array(86.814, 69.409, 55.448);


        let satellites: Satellite[] = req.body.satellites;

        this.quasarFire.GetLocationAndMessage(satellites)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(404).send("Error al procesar localización");
            })
    }
}

export default QuasarFireController;