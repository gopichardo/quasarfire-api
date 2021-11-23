import { Router } from "express";

export interface IController {
    router: Router;

    InitializeRoutes(): void;

}