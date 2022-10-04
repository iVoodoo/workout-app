import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Fragment } from 'react'

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
			url: `/workouts/${id}`,
		}), {
		refetchOnWindowFocus: false,
	})

	const {
		mutate,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation('Create new ex log',
		({ exId, times }) => $api({
			url: '/exercises/log',
			type: 'POST',
			body: { exerciseId: exId, times },
		}), {
		onSuccess(data) {
			console.log('LOG CREATED')
			console.log(data)
			navigate(`/exercise/${data._id}`)
		}
	})

	return (
		<>
			<div className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`} style={{ backgroundImage: `url(${bgImage})`, height: 356 }}>
				<Header />
				{isSuccess && (
					<div>
						<time className={styles.time}>{data.minutes + ' min.'}</time>
						<h1 className={stylesLayout.heading}>{data.name}</h1>
					</div>
				)}
			</div>
			<div className='wrapper-inner-page' style={{ paddingLeft: 0, paddingRight: 0 }}>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert text='Exercise log has been created' />}
				{isLoading && <Loader />}
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.exercises.map((ex, idx) => {
							return (
								<Fragment key={`ex ${idx} `}>
									<button aria-label={`Move to exercise - ${ex._id}`} onClick={() => mutate({
										exId: ex._id,
										times: ex.times,
									})}>
										<div className={styles.item}>
											<span>{ex.name}</span>
											<img key={`ex img ${ex.imageName}`} src={`/uploads/exercises/${ex.imageName}.svg`} alt={ex.imageName} draggable={false} height='34' />
										</div>
									</button>

									{(idx % 2 !== 0 && idx != data.exercises.length - 1) && <div className={styles.line}></div>}
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