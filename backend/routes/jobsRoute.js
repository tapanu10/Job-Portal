const express = require('express');
const userAuth = require('../middlewares/authMiddleware.js');
const { createJobController, getAllJobsController,jobStatsController } = require('../controllers/jobsController.js');
const router = express.Router();

// Create job route
router.post('/createjob', userAuth, createJobController); // Check this line

// Get all jobs route
router.get('/get-jobs', userAuth, getAllJobsController); // And this line

//JOBS stats filter
router.get('/job-stats',userAuth,jobStatsController)
module.exports = router;
