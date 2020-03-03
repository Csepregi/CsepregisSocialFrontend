import React from 'react'
import PropTypes from 'prop-types'

const PlaceForm = ({ onSubmit, logOut, handleNameChange, handleDescriptionChange, handleLocationChange, name, description, location }) => {
	return (
		<div>
			<button onClick={logOut}>Logout</button>
			<h2>post a new Place</h2>
			<form onSubmit={onSubmit}>
				<div>
					<label>
						Name
          <input className='name'
							{...name}
						/>
					</label>
				</div>
				<div>
					<label>
						Description
          <input
							{...description}
						/>
					</label>
				</div>
				<div>
					<label>
						Location
          <input
							{...location}
						/>
					</label>
				</div>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

// PlaceForm.propTypes = {
// 	handleSubmit: PropTypes.func.isRequired,
// 	name: PropTypes.object.isRequired,
// 	location: PropTypes.object.isRequired,
// 	description: PropTypes.object.isRequired

// }

export default PlaceForm