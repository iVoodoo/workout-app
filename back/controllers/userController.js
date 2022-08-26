//@desc Get user profileW
//@route GET /api/users/profile
//@access Private
export const getUserProfile = (req, res) => {
	const user = {
		name: 'Mikel',
		age: 20
	}

	res.json(user)
}