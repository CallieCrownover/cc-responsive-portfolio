const dotenv = require('dotenv')
dotenv.config();

const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3006;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/portfolio", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/portfolio.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/contact.html"));
});

app.post('/send-email', (req, res) => {
    console.log(req.body);
    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SENDGRID_KEY);

    sgMail.send({
        to: 'crownovercallie@gmail.com',
        from: 'crownovercallie@gmail.com',
        subject: `Portfolio: ${req.body.firstname} ${req.body.lastname}`,
        text: `
        Email Address: ${req.body.email}
        ${req.body.subject}
        `
    })
    .catch(err => {
        console.log(err)
    })

    res.redirect('/contact');
});

app.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
