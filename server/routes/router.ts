import {Express, Router} from "express";
import {promisify} from "util";
import * as fs from "fs";
import {join} from "path";

export class MyRouter {


    async initRoutes(app: Express, folder: string) {

        const router = Router();

        const readdir = promisify(fs.readdir);

        const files = await readdir(folder);

        for (let file of files) {

            if (file.slice(-3) !== '.js')
                continue;
            const fileName = file.substring(0, file.indexOf('.'))
            const filePath = join(process.cwd(), 'controllers', file);
            // const ctrlModule = await import(filePath);
            const ctrlModule = await import(filePath);
            const CtrlClass = ctrlModule[Object.keys(ctrlModule)[0]];
            const ctrl = new CtrlClass(router);
            app.use(`/api/${fileName}`, router)

        }


    }
}

export const router = new MyRouter();