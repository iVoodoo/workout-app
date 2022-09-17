import React from 'react'
import ReactSelect from 'react-select'
import { Link } from 'react-router-dom'

import Layout from '../../common/Layout'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

import styles from './NewWorkout.module.scss'

import bgImage from '../../../images/newWorkout.jpg'

const NewWorkout = () => {

	const [name, setName] = React.useState('')
	const [exercises, setExercises] = React.useState([])

	const handleSubmit = () => {
		console.log('SUBMIT');
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit}>
					<Field
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<Link to='/new-exercise' className={styles['dark-link']}>
						Add new exercise
					</Link>
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Exercises...'
						title='Exercises'
						options={[
							{ value: 'rerwerwb', label: 'Push-ups' },
							{ value: 'gasgasgsa', label: 'Pull-ups' },
						]}
						value={exercises}
						onChange={setExercises}
						isMulti={true}
					/>
					<Button
						text='Create'
						callback={() => { }}
					/>
				</form>
			</div>
		</>
	)
}

export default NewWorkout