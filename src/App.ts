import express from "express";
import { IController } from './interfaces/IController';
import AppController from "./controllers/App.controller";
import QuasarFireController from './controllers/QuasarFire.controller';
import MarkdownController from "./controllers/Markdown.controller";

class App {
    public app: express.Application;
    public port: number;
    controllers: IController[];
    appController: IController;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT!.toString());

        this.appController = new AppController();
        let markdownController = new MarkdownController();

        //Add Controllers
        this.controllers = [
            this.appController,
            markdownController,
            new QuasarFireController()
        ];



        this.InitializeMiddlewares();
        this.InitializeControllers(this.controllers);

        //Default Route
        this.app.use("/", markdownController.router);
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log("API listening on " + process.env.API_URL + ":" + this.port);
        });
    }

    private InitializeMiddlewares() {
        //initialize middlewares
        this.app.use(express.json());
    }

    private InitializeControllers(controllers: Array<IController>) {
        controllers.forEach(controller => {

            //Routes for Controllers
            this.app.use("/api", controller.router);
        });
    }


}

export default App;