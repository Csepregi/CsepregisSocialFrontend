import React from 'react'
import { Card } from 'react-bootstrap'

const Place = ({ place, deletePlace }) => {


	return (
		<Card style={{ width: '30px' }}>
			<Card.Body>
				<Card.Title>{place.name}</Card.Title>
				<Card.Text>{place.description}</Card.Text>
				<Card.Text>{place.location}</Card.Text>
				<button onClick={deletePlace(place.id, place.name)}>delete</button>
			</Card.Body>
		</Card>
	)
}

export default Place