import React from 'react'
import { Link } from 'react-router-dom'

import { menu } from './menuBase'

import styles from './Hamburger.module.scss'

import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerClose from '../../../../images/header/hamburger-close.svg'


const Hamburger = () => {

	const [show, setShow] = React.useState(false)

	const handleLogOut = () => {
		console.log('LOGOUT')
	}

	return (
		<div className={styles.wrapper}>
			<button type='button' onClick={() => setShow(!show)}>
				<img src={show ? hamburgerClose : hamburgerImage} alt='hamburger menu' />
			</button>
			<nav className={`${styles.menu} ${show ? styles.show : ''}`}>
				<ul>
					{menu.map((item, idx) => (
						<li key={`_menu_${idx}`}>
							<Link to={item.link}>{item.title}</Link>
						</li>
					))}
					<li>
						<button onClick={handleLogOut}>Logout</button>
					</li>
				</ul>
			</nav>
		</div >
	)
}

export default Hamburger
