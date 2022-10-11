import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import cn from 'classnames'

import { $api } from '../../../api/api'

import Header from '../../common/Header/Header'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import bgImage from '../../../images/bg-workout.jpg'

const SingleWorkout = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data, isSuccess } = useQuery('get workout',
		() => $api({
			url: `/workouts/log/${id}`,
		}), {
		refetchOnWindowFocus: false,
	})

	const {
		mutate: setWorkoutCompleted,
		error: errorCompleted,
	} = useMutation('Change log state',
		({ exId, times }) => $api({
			url: '/workouts/log/completed',
			type: 'PUT',
			body: { logId: id },
		}), {
		onSuccess() {
			navigate(`/workouts`)
		}
	})

	useEffect(() => {
		if (isSuccess &&
			data?.exerciseLogs &&
			data.exerciseLogs.length ===
			data.exerciseLogs.filter(log => log.completed).length) {
			setWorkoutCompleted()
		}
	}, [data?.exerciseLogs])

	return (
		<>
			<div className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`} style={{ backgroundImage: `url(${bgImage})`, height: 356 }}>
				<Header />
				{isSuccess && (
					<div>
						<time className={styles.time}>{data.minutes + ' min.'}</time>
						<h1 className={stylesLayout.heading}>{data.workout.name}</h1>
					</div>
				)}
			</div>
			<div className='wrapper-inner-page' style={{ paddingLeft: 0, paddingRight: 0 }}>
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.exerciseLogs.map((exLog, idx) => {
							return (
								<Fragment key={`ex ${idx} `}>
									<button aria-label='Move to exercise' onClick={() => navigate(`/exercise/${exLog._id}`)}>
										<div className={cn(styles.item, {
											[styles.completed]: exLog.completed,
										})}>
											<span>{exLog.exercise.name}</span>
											<img src={`/uploads/exercises/${exLog.exercise.imageName}.svg`} alt={exLog.exercise.imageName} draggable={false} height='34' />
										</div>
									</button>

									{(idx % 2 !== 0 && idx !== data.exerciseLogs.length - 1) && <div className={styles.line}></div>}
								</Fragment>
							)
						})}
					</div>
				) : (
					<Alert type='warning' text='Exercises are not found' />
				)}
			</div>
		</>
	)
}

export default SingleWorkout