import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../../../hooks/useAuth'

import { menu } from './menuBase'

import styles from './Hamburger.module.scss'

import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerClose from '../../../../images/header/hamburger-close.svg'
import { useOutsideAlerter } from '../../../../hooks/useOutsideAlerter'

const Hamburger = () => {

	const { setIsAuth } = useAuth()
	const { ref, isComponentVisible, setIsComponentVisible } = useOutsideAlerter(false)

	const handleLogout = () => {
		console.log('LOGOUT')
		localStorage.removeItem('token')
		setIsAuth(false)
		setIsComponentVisible(false)
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			<button type='button' onClick={() => setIsComponentVisible(!isComponentVisible)}>
				<img src={isComponentVisible ? hamburgerClose : hamburgerImage} alt='hamburger menu' draggable={false} height='24' />
			</button>
			<nav className={`${styles.menu} ${isComponentVisible ? styles.show : ''}`}>
				<ul>
					{menu.map((item, idx) => (
						<li key={`_menu_${idx}`}>
							<Link to={item.link}>{item.title}</Link>
						</li>
					))}
					<li>
						<button onClick={handleLogout}>Logout</button>
					</li>
				</ul>
			</nav>
		</div >
	)
}

export default Hamburger
