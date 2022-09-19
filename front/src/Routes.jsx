import { BrowserRouter, Route, Routes, } from "react-router-dom"

import { routes } from './routes'
import { useAuth } from './hooks/useAuth'

import Error404 from "./components/pages/404"

const App = () => {

	const { isAuth } = useAuth()

	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					if (route.auth && !isAuth) {
						return false
					}

					return (
						<Route
							path={route.path}
							exact={route.exact}
							element={<route.component />}
							key={`route ${route.path}`}
						/>
					)
				})}
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>

	)
}

export default App