const express = require('express')
const path = require('path')
const nodeMailer = require('nodemailer')
var bodyParser = require('body-parser')


const PORT = process.env.PORT || 5000;

var app = express();
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser());
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => res.render('pages/index'));

  app.post('/generateOrder', (req, res) => {
    console.log(req.body);
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: '3dproszapier@gmail.com',
          pass: 'dudewhatcrap'
      }
  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: '3dprosteam@gmail.com',
      subject: req.body.name,
      text: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.render('Message %s sent: %s', info.messageId, info.response);
  });
  res.status(200);
  res.send();
  });

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

