const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');

const PORT = process.env.PORT || 5678

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


const send = async (email, message, subject, imageObj) => {
    var arr = imageObj.split(',')
    const buffer = Buffer.from(arr[1], "base64");
    fs.writeFileSync("attachment-image.jpg", buffer);


    const fileAttachments = [
      {
        filename: 'postcard.png',
        path: path.join(__dirname, './attachment-image.jpg'),
      },
    ];
  
    const options = {
      to: email,
      subject: subject,
      html: `<p>${message}</p>`,
      attachments: fileAttachments,
      textEncoding: 'base64',
      headers: [
        { key: 'X-Application-Developer', value: 'Ishan Arya' },
        { key: 'X-Application-Version', value: 'v1.0.0.2' },
      ],
    };
  
    const messageId = await sendMail(options);
    return messageId;
  };

app.post('/send', (req, res) => {
    const { email, message, subject, imageObj } = req.body
    send(email, message, subject, imageObj)
      .then((messageId) => console.log('Message sent successfully:', messageId))
      .catch((err) => console.error(err));
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

