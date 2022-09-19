import React from 'react'
import { useMutation } from 'react-query'

import { $api } from '../../../api/api'

import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

import styles from './Auth.module.scss'

import bgImage from '../../../images/bg-auth.png'
import Loader from '../../ui/Loader'

const Auth = () => {

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [type, setType] = React.useState('auth')

	const {
		mutate: register,
		isLoading,
		error
	} = useMutation('Registration',
		() => $api({
			url: '/users',
			type: 'POST',
			body: { email, password },
			auth: false,
		}), {
		onSuccess(data) {
			localStorage.setItem('token', data.token)
		}
	}
	)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (type === 'auth') {
			console.log('AUTH')
		} else {
			register()
		}
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Auth || Register' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isLoading && <Loader />}
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