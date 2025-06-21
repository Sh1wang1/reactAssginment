const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const nodemailer = require('nodemailer');

const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API endpoint to get all items
app.get('/api/items', (req, res) => {
  const items = db.get('items').value();
  res.json(items);
});

// API endpoint to add a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now(); // Simple ID generation
  db.get('items').push(newItem).write();
  res.status(201).json(newItem);
});

// API endpoint to handle enquiry email
app.post('/api/enquire', async (req, res) => {
  const { item } = req.body;

  // Create a test account for Nodemailer
  let testAccount = await nodemailer.createTestAccount();

  // Create a transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Email content
  const mailOptions = {
    from: '"Item Manager" <no-reply@item-manager.com>',
    to: 'test@example.com', // Static email ID
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