import {createTestAccount, createTransport, getTestMessageUrl, SendMailOptions} from 'nodemailer';
import config from 'config';
import { log } from './logger';

const smtp = config.get<{
    user: string,
    pass: string,
    host: string,
    port: number,
    secure: boolean,
}>('smtp');

const transporter = createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass }
})

export const createTestMailAccount = async () => {
    const creds = await createTestAccount();
    log.info('mail creds:', creds);
    return creds;
}

export const sendMail = (payload: SendMailOptions) => {
    transporter.sendMail(payload, (err, info) => {
        if(err) {
            log.error(err, 'Error sending email');
            return;
        }
        log.info(`Preview URL: ${getTestMessageUrl(info)}`);
    })
}