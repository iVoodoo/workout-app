import React from 'react'

import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

import styles from './Auth.module.scss'

import bgImage from '../../../images/bg-auth.png'

const Auth = () => {

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [type, setType] = React.useState('auth')

	const handleSubmit = (e) => {
		e.preventDefault()

		if (type === 'auth') {
			console.log('AUTH')
		} else {
			console.log('REG')
		}
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Auth || Register' />
			<div className='wrapper-inner-page'>
				{true && <Alert type='warning' text='TEST ALERT' />}
				<form onSubmit={handleSubmit}>
					<Field
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<Field
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
					<div className={styles.wrapperButtons}>
						<Button
							text='Sign in'
							callback={() => setType('auth')}
						/>
						<Button
							text='Sign up'
							callback={() => setType('reg')}
						/>
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth