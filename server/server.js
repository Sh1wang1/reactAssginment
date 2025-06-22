const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const nodemailer = require('nodemailer');

const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();

// ✅ CORRECTED: Dynamic CORS based on frontend URL
const allowedOrigins = ['https://reactassginment-frontend.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Test route to verify backend is up
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get('/api/items', (req, res) => {
  const items = db.get('items').value();
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now();
  res.status(201).json(newItem);
});

app.post('/api/enquire', async (req, res) => {
  const { item } = req.body;

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: '"Item Manager" <no-reply@item-manager.com>',
    to: 'test@example.com',
    subject: `Enquiry about ${item.name}`,
    html: `
      <h1>New Enquiry</h1>
      <p>You have a new enquiry for the item: <strong>${item.name}</strong></p>
      <p><strong>Item Type:</strong> ${item.type}</p>
      <p><strong>Description:</strong> ${item.description}</p>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.status(200).json({ 
        message: 'Enquiry sent successfully!',
        previewUrl: nodemailer.getTestMessageUrl(info) 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending enquiry.');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
