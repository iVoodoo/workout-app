import express from 'express'
import { createWorkoutLog } from '../controllers/workout/logController.js'
import { createNewWorkout, deleteWorkout, getWorkout, updateWorkout } from '../controllers/workout/workoutController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewWorkout).put(protect, updateWorkout).delete(protect, deleteWorkout)
router.route('/log').post(protect, createWorkoutLog)
router.route('/:id').get(protect, getWorkout)

export default router