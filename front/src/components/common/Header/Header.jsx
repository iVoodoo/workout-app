import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

import Hamburger from './Hamburger/Hamburger'

import styles from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import authImage from '../../../images/header/authUser.svg'
import arrowImage from '../../../images/header/arrow.svg'

const Header = () => {

	const location = useLocation()
	const navigate = useNavigate()

	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button type='button' onClick={() => navigate(-1)}>
					<img src={arrowImage} alt='Back' />
				</button>
			) :
				(<button type='button' onClick={() => navigate(isAuth ? '/profile' : '/auth')}>
					<img src={isAuth ? authImage : userImage} alt='Auth' />
				</button>)
			}
			<Hamburger />
		</header>
	)
}

export default Header