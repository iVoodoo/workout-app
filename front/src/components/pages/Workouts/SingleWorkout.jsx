import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { Fragment } from 'react'

import { $api } from '../../../api/api'

import Header from '../../common/Header/Header'
import Alert from '../../ui/Alert/Alert'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import bgImage from '../../../images/bg-workout.jpg'

const SingleWorkout = () => {
	const { id } = useParams()

	const { data, isSuccess } = useQuery('get workout',
		() => $api({
			url: `/workouts/${id}`,
		}), {
		refetchOnWindowFocus: false,
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
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.exercises.map((ex, idx) => {
							return (
								<Fragment key={`ex ${idx} `}>
									<Link to={`/exercises/${ex._id}`}>
										<div className={styles.item}>
											<span>{ex.name}</span>
											<img key={`ex img ${ex.imageName}`} src={`/uploads/exercises/${ex.imageName}.svg`} alt={ex.imageName} draggable={false} height='34' />
										</div>
									</Link>

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