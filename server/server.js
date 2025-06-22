require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://reactassginment-frontend.onrender.com'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB Atlas'))
  .catch(err => {
    console.error('🔴 MongoDB connection error:', err);
    process.exit(1);
  });

// --- Mongoose Schema and Model ---
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  additionalImages: [String],
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// --- API Endpoints ---
app.get("/", (req, res) => {
  res.send("Backend is working with MongoDB!");
});

// GET all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }); // Sort by newest first
    console.log(`📋 Returning ${items.length} items from MongoDB`);
    res.json(items);
  } catch (error) {
    console.error('❌ Error fetching items from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST a new item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    console.log('✅ New item saved to MongoDB:', newItem.name);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('❌ Error saving item to MongoDB:', error);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// POST an enquiry (nodemailer logic remains the same)
app.post('/api/enquire', async (req, res) => {
  const { item } = req.body;

  try {
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
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔌 Accepting requests from: ${allowedOrigins.join(', ')}`);
});

