import { Router } from "express";

export class BaseRoutes<T, M> {

    public router: Router;
    public controller: T;
    public middleware: M;

    constructor(TController: { new(): T }, TMiddleware: { new(): M }) {
        this.router = Router();
        this.controller = new TController()
        this.middleware = new TMiddleware()
        this.routes()
    }

    routes() { }

}