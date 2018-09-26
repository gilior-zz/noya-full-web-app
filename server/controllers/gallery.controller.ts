import {Request, Response, Router} from "express";
import {utility} from "../services/utility";

export class GalleryController {
    constructor(router: Router) {
        router.get('/', this.getGallery)
    }

    private getGallery(req: Request, res: Response) {
        utility.loadContentAndSendToClient('gallery', res)
    }
}