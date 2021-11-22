import { IController } from '../interfaces/IController';
import express from "express";


class AppController implements IController {

    public router = express.Router();

    constructor() {
        this.InitializeRoutes();
    }

    /**
     * Initialize the controllers routes
     */
    private InitializeRoutes() {
        this.router.get("/", this.Status);
        this.router.get("/status", this.Status);
    }

    /**
     * Get the API Status
     * @param req request
     * @param res response
     */
    private Status(req: express.Request, res: express.Response) {
        res.status(200).send("Api Online!");
    }

}

export default AppController;