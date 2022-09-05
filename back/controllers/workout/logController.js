import asyncHandler from "express-async-handler"
import WorkoutLog from "../../models/workoutLogModel.js"

//@desc 	Create new workout log
//@route 	Post /api/workouts/log
//@access Private

export const createWorkoutLog = asyncHandler(async (req, res) => {
	const { workoutId } = req.body

	const workoutLog = await WorkoutLog.create({
		user: req.user._id,
		workout: workoutId,
	})

	res.json(workoutLog)
})