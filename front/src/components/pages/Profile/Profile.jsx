import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { $api } from '../../../api/api'

import Loader from '../../ui/Loader'
import Header from '../../common/Header/Header'

import styles from './Profile.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import bgImage from '../../../images/bg-profile.png'
import afterImage from '../../../images/afterImage.jpg'
import userImage from '../../../images/header/user.svg'
import Counters from '../../ui/Counters/Counters'

const Profile = () => {

	const { data, isSuccess } = useQuery('home page counter',
		() => $api({
			url: '/users/profile',
		}), {
		refetchOnWindowFocus: false,
	})

	return (
		<>
			<div className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`} style={{ backgroundImage: `url(${bgImage})` }}>
				<Header />

				<div className={styles.center}>
					<img src={userImage} alt='Profile' height='60' />
					{isSuccess && <h1 className={stylesLayout.heading}>{data.email}</h1>}
				</div>

				{isSuccess && <Counters minutes={data.minutes} workouts={data.workouts} kgs={data.kgs} type='profile' />}

			</div>
			<div className='wrapper-inner-page' style={{ paddingLeft: 0, paddingRight: 0 }}>
				<div className={styles.before_after}>
					<div>
						<div className={styles.heading}>Before</div>
						<img src={afterImage} alt='Image before trainings' />
					</div>
					<div>
						<div className={styles.heading}>After</div>
						<img src={afterImage} alt='Image after trainings' />
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile