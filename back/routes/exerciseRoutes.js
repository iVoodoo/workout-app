import express from 'express'
import { createExerciseLog, getExerciseLog } from '../controllers/exercise/LogController.js'
import { createNewExercise } from '../controllers/exercise/mainController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise)
router.route('/log').post(protect, createExerciseLog)
router.route('/log/:id').get(protect, getExerciseLog)


export default router