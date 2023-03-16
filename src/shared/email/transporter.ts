import nodemailer from 'nodemailer'
import config from '../../config/config';

 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "leonel.carro94@gmail.com",
      pass: config.mail.passwordGmail
    },
  })

transporter.verify().then(() => {
    console.log('Server is ready to take our messages')
})

export default transporter