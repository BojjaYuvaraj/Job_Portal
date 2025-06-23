import express from 'express'
import {registerCompany, loginCompany, getCompanyData, getCompanyJobApplicants, postJob, getCompanyPostedJobs, ChangeJobApplicationsStatus, changeVisibility} from '../controllers/companyControllers.js'
import { protectCompany } from '../middleware/authmiddleware.js'
import upload from '../config/multer.js'

const router = express.Router()

router.post('/register',upload.single('image'), registerCompany)
router.post('/login',loginCompany)
router.get('/company', protectCompany, getCompanyData)
router.post('/post-job', protectCompany, postJob);
router.get('/applicants',protectCompany, getCompanyJobApplicants)
router.get('/list-jobs',protectCompany, getCompanyPostedJobs)
router.post('/change-status',protectCompany, ChangeJobApplicationsStatus)
router.post('/change-visibility',protectCompany ,changeVisibility)

export default router;
