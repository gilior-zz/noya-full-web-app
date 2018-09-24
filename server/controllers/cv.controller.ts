import {Request, Response, Router} from "express";
import {utility} from "../services/utility";

export class CVController {
    constructor(router: Router) {
        router.get('/', this.getCV)
    }

    private getCV(req: Request, res: Response) {
        utility.loadContentAndSendToClient('cv', res)
    }
}