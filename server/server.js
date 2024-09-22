const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = 3000;

// Middleware for file uploads
app.use(fileUpload());

// POST endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  let fileDetails = {
    file_valid: false,
    file_mime_type: '',
    file_size_kb: 0,
  };

  // Check if a file was uploaded
  if (req.files && req.files.file) {
    const uploadedFile = req.files.file;
    
    // Validate file type and size
    fileDetails.file_valid = true; // Or add your validation logic
    fileDetails.file_mime_type = uploadedFile.mimetype;
    fileDetails.file_size_kb = Math.round(uploadedFile.size / 1024); // Size in KB
  }

  // Process data and prepare the response
  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers: [], // Your logic here
    alphabets: [], // Your logic here
    highest_lowercase_alphabet: [], // Your logic here
    ...fileDetails,
  };

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
