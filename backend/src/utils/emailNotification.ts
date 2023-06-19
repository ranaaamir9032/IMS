import * as nodemailer from 'nodemailer';


export const notifyByEmail = (email: string, subj : string, txt : string) =>{
    
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
          },
        });
    
        let info = {
          from: '"Abdullah"',
          to: email,
          subject: subj,
          text: txt,
        };
    
        return transporter.sendMail(info);
}