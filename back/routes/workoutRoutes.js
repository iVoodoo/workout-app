import express from 'express'
import { createWorkoutLog } from '../controllers/workout/logController.js'
import { createNewWorkout, getWorkout } from '../controllers/workout/workoutController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewWorkout)
router.route('/log').post(protect, createWorkoutLog)
router.route('/:id').get(protect, getWorkout)

export default router