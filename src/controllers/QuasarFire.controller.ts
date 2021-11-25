import { IController } from '../interfaces/IController';
import express from 'express';
import { body, Result, ValidationError, validationResult } from "express-validator";
import QuasarFire from '../business/QuasarFire';
import Satellite from 'dtos/Satellite.dto';

class QuasarFireController implements IController {

    public router = express.Router();

    constructor() {
        this.InitializeRoutes();
    }

    /**
     * Initialize the controllers routes
     */
    InitializeRoutes() {
        this.router.post("/topsecret",
            body("satellites").isArray(),
            this.GetLocationAndMessage);
    }

    /**
     * Get Location and Message from Imperial Ship
     * @param req Request
     * @param res Response
     */
    private GetLocationAndMessage(req: express.Request, res: express.Response) {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }

        let satellites: Satellite[] = req.body.satellites;

        if (satellites.length === 0) {
            return res.status(404).send("No es posible determinar la posición y/o mensaje con los datos proporcionados");
        }

        let quasarFire = new QuasarFire();
        quasarFire.GetLocationAndMessage(satellites)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(404).send("Error al procesar localización");
            })
    }
}

export default QuasarFireController;