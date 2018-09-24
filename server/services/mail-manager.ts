import * as nodemailer from 'nodemailer'
import {SentMessageInfo} from 'nodemailer'
import {promisify} from "util";


export async function sendMail(to: string[] = ['liorgish@gmail.com'], from: string, body: string): Promise<SentMessageInfo> {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'liorgish@gmail.com',
            pass: 'fkmruwojyjouuvft'
        }
    });

    const mailOptions = {
        from: from,
        to: to.join(','),
        subject: 'mail from my web-site',
        text: body
    };

    const sendMail = promisify(transporter.sendMail);

    try {
        const response = await sendAsync(transporter, mailOptions)
        return Promise.resolve(response)
    }
    catch (e) {
        return Promise.reject(e)
    }


}

function sendAsync(transporter, mailOptions): Promise<SentMessageInfo> {
    const promise = new Promise((res, rej) => {
        transporter.sendMail(mailOptions, (error, info: SentMessageInfo) => {
            if (error) {
                rej(error);
            }
            res(info);
        });
    })
    return promise;
}