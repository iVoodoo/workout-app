import React from 'react'
import { BrowserRouter, Route, Router, Routes, } from "react-router-dom"
import Auth from './components/pages/Auth/Auth'

import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' exact={true} element={<Home />} />
				<Route path='/new-workout' element={<NewWorkout />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</BrowserRouter>

	)
}

export default App