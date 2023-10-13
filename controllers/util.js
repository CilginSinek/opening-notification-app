const { Notification } = require("electron");
const NodeWebcam = require("node-webcam");
const nodemailer = require("nodemailer");
const { getData } = require("../models/store");
const { getActiveUserDetails } = require("./GetFuncs");

//! Pic Options
const opts = {
  width: 300,
  height: 200,
  quality: 1,
  frames: 1,
  delay: 0,
  saveShots: false,
  output: "png",
  device: false,
  callbackReturn: "base64",
  verbose: false,
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: getData("settings").mail,
    pass: getData("settings").pass,
  },
});

const SendMail = async (image) => {
  let message;
  if (image) {
    message = {
      from: `"Notification App" <${getData("settings").mail}>`,
      to: getActiveUserDetails().mail,
      subject: "Notification App",
      html: `
      <h1>Notification App has a notification</h1>
      <p>Your Computer has run in ${new Date()}</p>
      `,
      attachments: [
        {
          path: image,
        },
      ],
    };
  } else {
    message = {
      from: `"Notification App" <${getData("settings").mail}>`,
      to: getActiveUserDetails().mail,
      subject: "Notification App",
      html: `
      <h1>Notification App has a notification</h1>
      <p>Your Computer has run in ${new Date()}</p>
      `,
    };
  }
  const info = await transporter.sendMail(message);
  console.log(info);
  return info;
};

exports.snapPhoto = () => {
  NodeWebcam.capture("test_picture", opts, async function (err, data) {
    if (err) {
      console.log(err);
      const notification = new Notification({
        title: "Error",
        body: err,
      });
    } else {
      await SendMail(data).catch((error) => {
        const notification = new Notification({
          title: "Error",
          body: error,
        });
        if (error.response) {
          console.error(error.response.body);
        }
      });
    }
  });
};

exports.SendMail = SendMail;