import {Request, Response, Router} from "express";
import {utility} from "../services/utility";

export class ProgramsController {
    constructor(router: Router) {
        router.get('/', this.getPrograms)
    }

    private getPrograms(req: Request, res: Response) {
        utility.loadContentAndSendToClient('programs', res);
    }
}