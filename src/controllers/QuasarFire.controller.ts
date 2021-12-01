import { IController } from '../interfaces/IController';
import express from 'express';
import { body, Result, validationResult, param } from "express-validator";
import QuasarFire from '../business/QuasarFire';
import Satellite from '../dtos/Satellite.dto';

class QuasarFireController implements IController {

    public router = express.Router();

    constructor() {
        this.InitializeRoutes();
    }

    /**
     * Initialize the controllers routes
     */
    InitializeRoutes() {
        //POST /topsecret/
        this.router.post("/topsecret", body("satellites").isArray(), this.GetLocationAndMessage);

        //POST /topsecret_split
        this.router.post("/topsecret_split/:satellite_name?",
            param("satellite_name").isString(),
            body("distance").isNumeric(),
            body("message").isArray(),
            this.SetSatelliteInformation);

        //GET /topsecret_split
        this.router.get("/topsecret_split", this.GetLocationAndMessageSplit);
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

    /**
     * Set Satellite Information
     * @param req Request
     * @param res Response
     */
    private SetSatelliteInformation(req: express.Request, res: express.Response) {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }

        let satelliteName: string = req.params.satellite_name;
        let satelliteDistance: number = req.body.distance;
        let satelliteMessage: Array<string> = req.body.message;

        let satellite = new Satellite(satelliteName, satelliteDistance, satelliteMessage);

        //Set satellite information
        new QuasarFire().SetSatelliteInformation(satellite)
            .then(saved => {
                if (saved) {
                    res.status(200).send("Información guardada correctamente");
                } else {
                    res.status(400).send("Error al guardar información");
                }
            })
            .catch(error => {
                res.status(404).send("Error al guardar información del satelite");
            });
    }

    /**
     * Get Location and Message from Imperial Ship Split
     * @param req Request
     * @param res Response
     */
    private GetLocationAndMessageSplit(req: express.Request, res: express.Response) {

        new QuasarFire().GetLocationAndMessageSplit()
            .then(result => {

                if (result) {
                    res.status(200).send(result);
                }
                else {
                    res.status(404).send("No existe suficiente información");
                }

            })
            .catch(error => {
                res.status(404).send(error);
            });

    }
}

export default QuasarFireController;