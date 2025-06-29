import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'

const router = express.Router()

// router.get('/data', getUserData);
// Get user Data
router.get('/data',getUserData)

// Apply for a job
router.post('/apply',applyForJob)

// Get applied job data
router.get('/applications',getUserJobApplications)

// update user profile (resume)
router.post('/update-resume',upload.single('resume'), updateUserResume)

export default router;