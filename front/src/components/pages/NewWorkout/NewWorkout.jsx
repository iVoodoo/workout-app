import React from 'react'
import ReactSelect from 'react-select'
import { useMutation } from 'react-query'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { $api } from '../../../api/api'
import { useAuth } from '../../../hooks/useAuth.js'

import Layout from '../../common/Layout'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'


import bgImage from '../../../images/newWorkout.jpg'

const NewWorkout = () => {

	const [name, setName] = React.useState('')
	const [exercisesCurrent, setExercisesCurrent] = React.useState([])

	const { data, isSuccess } = useQuery('list exercises',
		() => $api({
			url: '/exercises',
		}), {
		refetchOnWindowFocus: false,
	})


	const {
		mutate,
		isLoading,
		isSuccess: isSuccessMutate,
		error
	} = useMutation('Create new workout',
		({ exIds }) => $api({
			url: '/workouts',
			type: 'POST',
			body: { name, exerciseIds: exIds },
		}),
		{
			onSuccess() {
				setName('')
				setExercisesCurrent([])
			}
		}
	)


	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('SUBMIT');
		const exIds = exercisesCurrent.map(ex => ex.value)
		console.log(exIds);
		mutate({
			exIds,
		})
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert text='Workout has been created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<Link to='/new-exercise' className='dark-link'>
						Add new exercise
					</Link>
					{isSuccess && data &&
						(<ReactSelect
							classNamePrefix='select2-selection'
							placeholder='Exercises...'
							title='Exercises'
							options={data.map(exercise => ({
								value: exercise._id,
								label: exercise.name
							}))}
							value={exercisesCurrent}
							onChange={setExercisesCurrent}
							isMulti={true}
						/>)
					}
					<Button
						text='Create'
						callback={() => { }}
					/>
				</form>
			</div>
		</>
	)
}

export default NewWorkout