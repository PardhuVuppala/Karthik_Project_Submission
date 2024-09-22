const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = 4000;  // Changed to port 4000 to avoid conflicts

// Middleware for parsing JSON bodies
app.use(cors());  // Enable CORS
app.use(express.json());
app.use(fileUpload());

// POST endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  let fileDetails = {
    file_valid: false,
    file_mime_type: '',
    file_size_kb: 0,
  };

  // Initialize response data
  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers: [],
    alphabets: [],
    highest_lowercase_alphabet: [],
    ...fileDetails,
  };

  // Check if a file was uploaded
  if (req.files && req.files.file) {
    const uploadedFile = req.files.file;

    // Validate file type and size
    fileDetails.file_valid = true;
    fileDetails.file_mime_type = uploadedFile.mimetype;
    fileDetails.file_size_kb = Math.round(uploadedFile.size / 1024); // Size in KB
  } else {
    fileDetails.file_valid = false;
  }

  // Process input data
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (isNaN(item)) {
        // If it's not a number, treat it as an alphabet
        if (/^[a-zA-Z]$/.test(item)) {
          response.alphabets.push(item);
        }
      } else {
        // If it's a number, add it to the numbers array
        response.numbers.push(item);
      }
    });

    // Determine the highest lowercase alphabet
    const lowercaseAlphabets = response.alphabets.filter(char => char === char.toLowerCase());
    if (lowercaseAlphabets.length > 0) {
      response.highest_lowercase_alphabet = [lowercaseAlphabets.reduce((a, b) => (a > b ? a : b))];
    }
  }

  // Update file details in response
  response.file_valid = fileDetails.file_valid;
  response.file_mime_type = fileDetails.file_mime_type;
  response.file_size_kb = fileDetails.file_size_kb;

  // Send response
  res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
