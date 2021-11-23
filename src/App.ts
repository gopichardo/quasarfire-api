import express from "express";
import { IController } from './interfaces/IController';
import AppController from "./controllers/App.controller";
import QuasarFireController from './controllers/QuasarFire.controller';

class App {
    public app: express.Application;
    public port: number;
    controllers: IController[];
    appController: IController;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.API_PORT!.toString());

        this.appController = new AppController();

        //Add Controllers
        this.controllers = [
            this.appController,
            new QuasarFireController()
        ];



        this.InitializeMiddlewares();
        this.InitializeControllers(this.controllers);

        //Default Route
        this.app.use("/", this.appController.router);
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log("API listening on " + process.env.API_URL + ":" + this.port);
        });
    }

    private InitializeMiddlewares() {
        //initialize middlewares
    }

    private InitializeControllers(controllers: Array<IController>) {
        controllers.forEach(controller => {

            //Routes for Controllers
            this.app.use("/api", controller.router);
        });
    }


}

export default App;