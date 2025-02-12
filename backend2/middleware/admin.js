const dotenv = require('dotenv');

const validateAdmin = (req, res, next) => {
    const apiKey = req.header('Authorization');

    console.log('Received API Key:', apiKey); // Log the API key
    console.log('Expected API Key:', process.env.ADMIN_API_KEY); // Log the expected API key

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
  
module.exports = validateAdmin;