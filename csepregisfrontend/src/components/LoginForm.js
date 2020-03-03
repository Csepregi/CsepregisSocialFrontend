import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => {
	return (
		<div>

			<form onSubmit={handleSubmit}>
				<div>
					username
        <input
						{...username}
					/>
				</div>
				<div>
					password
        <input
						{...password}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
}

export default LoginForm