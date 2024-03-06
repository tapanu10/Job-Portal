const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // Fixed typo here
// Files imports
const testRoutes = require('./routes/testRoutes.js');
const authRoutes=require('./routes/authRoutes.js');
const userRoutes=require('./routes/userRoutes.js')
const jobsRoutes=require('./routes/jobsRoute.js')
// Dotenv config
dotenv.config();

// Import db after loading environment variables
const db = require('./db');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Fixed typo here

// Routes 
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/jobs/',jobsRoutes)
//validation middleware
//app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Hello');
});

// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running');
});
