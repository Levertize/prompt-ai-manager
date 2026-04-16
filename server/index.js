const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const promptRoutes = require('./routes/prompts');

app.use(cors());
app.use(express.json());
app.use('/api/prompts', promptRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));