import {Request, Response, Router} from "express";
// import {promisify} from "util";
import {promisify} from "util";
import {utility} from '../services/utility'
import {TYPES} from "tedious";

const fs = require('fs');
const read = promisify(fs.readFile);

export class HomeController {
    constructor(private router: Router) {
        router.get('/text', this.getHomePageText)
        router.get('/cards', this.getCards)
    }

    async getHomePageText(req: Request, res: Response) {
        utility.loadContentAndSendToClient('HomePageTextSelect', res, {
            type: TYPES.NVarChar,
            name: 'lang',
            value: req['lang']
        })
    }

    async getCards(req: Request, res: Response) {
        utility.loadContentAndSendToClient('cards', res)

    }
}