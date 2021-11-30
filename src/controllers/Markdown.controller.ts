import express from "express";
import Markdown from "../business/Markdown";

import { IController } from "interfaces/IController";


class MarkdownController implements IController {
    public router = express.Router();

    constructor() {
        this.InitializeRoutes();
    }

    InitializeRoutes() {
        //Route to show readme.md
        this.router.get("/", this.MarkdownViewer);
    }

    /**
* Render the readme.md
* @param req Request
* @param res Response
*/
    private MarkdownViewer(req: express.Request, res: express.Response) {

        new Markdown().GenerateHtmlMarkdown()
            .then(data => {
                res.status(200).contentType("html").send(data);
            })
            .catch(err => {
                res.status(200).send("Api Online!");
            });
    }





}

export default MarkdownController;
