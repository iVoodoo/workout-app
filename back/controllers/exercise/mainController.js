import asyncHandler from "express-async-handler"
import Exercise from "../../models/exerciseModel.js"

//@desc 	Create new exercise
//@route 	POST /api/exercises
//@access Private

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, imageIndex } = req.body

	const exercise = await Exercise.create({
		name,
		times,
		imageIdx: imageIndex,
	})

	res.json(exercise)
})

//@desc 	Update exercises
//@route 	PUT /api/exercises
//@access Private

export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, imageIndex, exerciseId } = req.body

	const exercises = await Exercise.findById(exerciseId)

	if (!exercises) {
		res.status(404)
		throw new Error('Данное упражнение не найдено!')
	}

	exercises.name = name
	exercises.times = times
	exercises.imageIdx = imageIndex

	const updatedExercise = await exercises.save()

	res.json(updatedExercise)
})

//@desc 	Delete exercises
//@route 	DELETE /api/exercises
//@access Private

export const deleteExercise = asyncHandler(async (req, res) => {
	const { exerciseId } = req.body

	const exercises = await Exercise.findById(exerciseId)

	if (!exercises) {
		res.status(404)
		throw new Error('Данное упражнение не найдено!')
	}

	await exercises.remove()

	res.json({ message: 'Упражнение было удалено' })
})

//@desc 	Get  exercises
//@route 	POST /api/exercises
//@access Private

export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await Exercise.find({})

	res.json(exercises)
})
