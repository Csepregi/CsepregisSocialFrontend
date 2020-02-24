import React, { useState } from 'react'
import Place from './Place'

const PlaceForm = ({ onSubmit, logOut, handleNameChange, handleDescriptionChange, handleLocationChange, name, description, location }) => {
	return (
		<div>
			<button onClick={logOut}>Logout</button>
			<h2>post a new Place</h2>
			<form onSubmit={onSubmit}>
				<div>
					<label>
						Name
          <input
							value={name}
							onChange={handleNameChange}
						/>
					</label>
				</div>
				<div>
					<label>
						Description
          <input
							value={description}
							onChange={handleDescriptionChange}
						/>
					</label>
				</div>
				<div>
					<label>
						Location
          <input
							value={location}
							onChange={handleLocationChange}
						/>
					</label>
				</div>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default PlaceForm