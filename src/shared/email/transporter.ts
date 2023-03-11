import nodemailer from 'nodemailer'
import config from '../../config/config';

 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "leonel.carro94@gmail.com", // generated ethereal user
      pass: config.mail.passwordGmail, // generated ethereal password
    },
  })

transporter.verify().then(() => {
    console.log('Server is ready to take our messages')
})

export default transporter