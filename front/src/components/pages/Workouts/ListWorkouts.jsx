import { useMutation, useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

import { $api } from '../../../api/api'

import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

import styles from './SingleWorkout.module.scss'

import bgImage from '../../../images/bg-workout.jpg'

const ListWorkouts = () => {
	const navigate = useNavigate()

	const { data, isSuccess } = useQuery('get workouts',
		() => $api({
			url: `/workouts`,
		}), {
		refetchOnWindowFocus: false,
	})

	const {
		mutate: createWorkoutLog,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation('Create new workout log',
		({ workoutId }) => $api({
			url: '/workouts/log',
			type: 'POST',
			body: { workoutId },
		}), {
		onSuccess(data) {
			console.log('LOG CREATED')
			console.log(data)
			navigate(`/workout/${data._id}`)
		}
	})

	return (
		<>
			<Layout bgImage={bgImage} heading='Workout list' />

			<div className='wrapper-inner-page' style={{ paddingLeft: 0, paddingRight: 0 }}>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert text='Exercise log has been created' />}
				{isLoading && <Loader />}
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.map((workout, idx) =>
							<button key={`workout ${idx} `} aria-label='Create new workout' onClick={() => createWorkoutLog({
								workoutId: workout._id
							})}>
								<div className={styles.item}>
									<span>{workout.name}</span>
								</div>
							</button>
						)
						}
					</div>
				) : (
					<Alert type='warning' text='Workouts are not found' />
				)}
			</div>
		</>
	)
}

export default ListWorkouts