import {promisify} from "util";
import {Response} from "express";
import {join} from "path";

const fs = require('fs');
const read = promisify(fs.readFile);

class Utility {
    async getFileContent(pathToFile) {
        const raw = await read(pathToFile, {encoding: 'utf8'});
        const json = JSON.parse(raw);
        return json;
    }

    sendDataToClient(data, res: Response) {
        res.status(200).send(data)
    }

    async loadContentAndSendToClient(file: string, res: Response) {
        const mockFile = join(process.cwd(), 'mock-data', `${file}.json`);
        const json = await this.getFileContent(mockFile);
        this.sendDataToClient(json, res);
    }
}

export const utility = new Utility();

