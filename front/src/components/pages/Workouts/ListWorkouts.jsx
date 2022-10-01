import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { $api } from '../../../api/api'

import Alert from '../../ui/Alert/Alert'
import Layout from '../../common/Layout'

import styles from './SingleWorkout.module.scss'

import bgImage from '../../../images/bg-workout.jpg'

const ListWorkouts = () => {

	const { data, isSuccess } = useQuery('get workouts',
		() => $api({
			url: `/workouts`,
		}), {
		refetchOnWindowFocus: false,
	})

	return (
		<>
			<Layout bgImage={bgImage} heading='Workout list' />

			<div className='wrapper-inner-page' style={{ paddingLeft: 0, paddingRight: 0 }}>
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.map((workout, idx) =>
							<Link to={`/workout/${workout._id}`}>
								<div className={styles.item} key={`workout ${idx} `}>
									<span>{workout.name}</span>
								</div>
							</Link>
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