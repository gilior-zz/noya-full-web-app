import {Express, Router} from "express";
import {promisify} from "util";
import {join} from "path";
import * as fs from "fs";
import {ComtactController} from "../controllers/contact.controller";
import {CVController} from "../controllers/cv.controller";

export class MyRouter {


    async initRoutes(app: Express, folder: string) {

        let router = Router();
        new ComtactController(router);
        app.use(`/api/contact`, router)

        router = Router();
        new CVController(router);
        app.use(`/api/cv`, router)

        // const readdir = promisify(fs.readdir);
        //
        // const files = await readdir(join(process.cwd(), folder));
        //
        // for (let file of files) {
        //     const router = Router();
        //     if (file.slice(-3) !== '.js')
        //         continue;
        //     const fileName = file.substring(0, file.indexOf('.'))
        //     const filePath = join(process.cwd(), 'controllers', file);
        //     // const ctrlModule = await import(filePath);
        //     const ctrlModule = await import(`${filePath}`);
        //     const CtrlClass = ctrlModule[Object.keys(ctrlModule)[0]];
        //     const ctrl = new CtrlClass(router);
        //     app.use(`/api/${fileName}`, router)

        // }


    }
}

export const router = new MyRouter();