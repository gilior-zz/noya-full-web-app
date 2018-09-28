import {promisify} from "util";
import {Request, Response} from "express";
import {callProc, connect} from "./sql-manager";
import {Connection, TYPES} from "tedious";
import {proc_param} from '../../shared/models'
const fs = require('fs');
const read = promisify(fs.readFile);

class Utility {
    async getFileContent(pathToFile) {
        const raw = await read(pathToFile, {encoding: 'utf8'});
        const json = JSON.parse(raw);
        return json;
    }

    sendDataToClient(data, res: Response) {
        return res.status(200).send(data)
    }

    sendErrorToClient(data, res: Response) {
        res.status(500).send(data)
    }

    async loadContentAndSendToClient(proc: string, res: Response, ...params: proc_param[]) {
        // const mockFile = join(process.cwd(), 'mock-data', `${file}.json`);
        // const json = await this.getFileContent(mockFile);
        const con = await connect();
        const fromDB = await callProc(con as Connection, proc, ...params)

        // const foo=JSON.parse(fromDB)
        this.sendDataToClient(fromDB, res);
    }

    sendMessage(req: Request, res: Response) {
        const json = req.body;
        this.sendDataToClient(json, res);
    }
}

export const utility = new Utility();

