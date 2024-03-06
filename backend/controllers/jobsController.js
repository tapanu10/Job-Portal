const jobsModel = require('../models/jobsModel');
const Job = require('../models/jobsModel');
const mongoose=require('mongoose');
const moment=require('moment');
//CREATE JOB
const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: company and position'
        });
    }

    // Add createdBy field to the request body
    req.body.createdBy = req.user.userId;

    try {
        // Create a new job instance using the Job model and save it to the database
        const job = await Job.create(req.body);
        res.status(201).json({ success: true, job });
    } catch (error) {
        // Handle any errors that occur during job creation
        console.error('Error creating job:', error);
        res.status(500).json({ success: false, message: 'Failed to create job' });
    }
};

module.exports = createJobController;


//GET JOB
const getAllJobsController = async (req, res, next) => {
    const { status, workType, search, sort } = req.query;
    //conditons for searching filters
    const queryObject = {
      createdBy: req.user.userId,
    };
    //logic filters
    if (status && status !== "all") {
      queryObject.status = status;
    }
    if (workType && workType !== "all") {
      queryObject.workType = workType;
    }
    if (search) {
      queryObject.position = { $regex: search, $options: "i" };
    }
  
    let queryResult = jobsModel.find(queryObject);
  
    //sorting
    if (sort === "latest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "a-z") {
      queryResult = queryResult.sort("position");
    }
    if (sort === "z-a") {
      queryResult = queryResult.sort("-position");
    }
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    queryResult = queryResult.skip(skip).limit(limit);
    //jobs count
    const totalJobs = await jobsModel.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs / limit);
  
    const jobs = await queryResult;
  
    // const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
      totalJobs,
      jobs,
      numOfPage,
    });
  };
  

//Jobs stats and filter controller
jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
      // search by user jobs
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
  
    //default stats
    const defaultStats = {
      pending: stats.pending || 0,
      reject: stats.reject || 0,
      interview: stats.interview || 0,
    };
  
    //monthly yearly stats
    let monthlyApplication = await jobsModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    monthlyApplication = monthlyApplication
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MMM Y");
        return { date, count };
      })
      .reverse();
    res
      .status(200)
      .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
  };

module.exports = {
    createJobController,
    getAllJobsController,
    jobStatsController
}