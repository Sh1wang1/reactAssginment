const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3000;

// Handle client-side routing
app.use(history());

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});
