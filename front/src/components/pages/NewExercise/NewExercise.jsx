import { useState } from 'react'
import cn from 'classnames'
import { useMutation } from 'react-query'

import { $api } from '../../../api/api'

import Layout from '../../common/Layout'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

import styles from './NewExercise.module.scss'

import bgImage from '../../../images/newExercise.jpg'

const data = [
	'chest', 'shoulders', 'biceps', 'legs', 'hit'
]

const NewExercise = () => {

	const [name, setName] = useState('')
	const [times, setTimes] = useState(3)
	const [imageName, setImageName] = useState('chest')

	const { isSuccess,
		mutate,
		isLoading,
		error
	} = useMutation('Create new exercise',
		() => $api({
			url: '/exercises',
			type: 'POST',
			body: { name, times, imageName },
		}), {
		onSuccess() {
			setName('')
			setTimes(3)
			setImageName('chest')
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		if (name && times && imageName) {
			mutate()
		}
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new exercise' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccess && <Alert text='Exercise has been created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<Field
						type='text'
						placeholder='Enter times'
						value={times}
						onChange={e => setTimes(e.target.value)}
						required
					/>
					<div className={styles.images}>
						{data.map(name => (
							<img key={`ex img ${name}`} src={`/uploads/exercises/${name}.svg`} alt={name} draggable={false}
								className={cn({
									[styles.active]: imageName === name
								})}
								onClick={() => setImageName(name)}
							/>
						))}
					</div>
					<Button
						text='Create'
						callback={() => { }}
					/>
				</form>
			</div>
		</>
	)
}

export default NewExercise