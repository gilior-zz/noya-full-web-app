import {Request, Response, Router} from "express";
import {Message} from '../shared/models'
import {SentMessageInfo} from "nodemailer";
import {sendMail} from "../services/mail-manager";
import {pick} from 'lodash'
import {utility} from "../services/utility";

export class ComtactController {
    constructor(router: Router) {
        router.post('/send', this.sendMsg)
    }

    private async sendMsg(req: Request, res: Response) {
        const msg = req.body as Message;

        const content = pick(msg, ['Sender.Name', 'Sender.Email', 'Content', 'IP'])
        const json = JSON.stringify(content, undefined, 2);


        try {
            const sentMessageInfo: SentMessageInfo = await sendMail(undefined, msg.Sender.Email, json)
            utility.sendDataToClient(sentMessageInfo, res);
        }
        catch (e) {
            utility.sendErrorToClient(e, res);
        }

    }
}