import {Request, Response, Router} from "express";
import {utility} from "../services/utility";

export class LinksController {
    constructor(router: Router) {
        router.get('/', this.getLinks)
    }

    private getLinks(req: Request, res: Response) {
        utility.loadContentAndSendToClient(req,'LinksSelect', res)
    }
}