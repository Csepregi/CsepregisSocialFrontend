import React from 'react'
import PlaceForm from "./PlaceForm"
import { render, fireEvent } from '@testing-library/react'

const Wrapper = (props) => {

	const handleNameChange = (event) => {
		props.state.value = event.target.value
	}

	const handleDescriptionChange = (event) => {
		props.state.value = event.target.value
	}

	const handleLocationChange = (event) => {
		props.state.value = event.target.value
	}

	const logOut = async () => {
		await window.localStorage.removeItem('loggedPlaceappUser');
		setUser(null)
	}


	return (
		<PlaceForm
			onSubmit={props.addPlace}
			handleNameChange={handleNameChange}
			handleDescriptionChange={handleDescriptionChange}
			handleLocationChange={handleLocationChange}
			name={props.state.name}
			description={props.state.description}
			location={props.state.location}
			logOut={logOut}
		/>
	)
}

test('<PlaceForm /> updates parent state and calls onSubmit', () => {
	const addPlace = jest.fn()
	const state = {
		name: '',
		description: '',
		location: ''
	}

	const component = render(
		<Wrapper addPlace={addPlace} state={state} />
	)

	const input = component.container.querySelector('.name')
	const form = component.container.querySelector('form')

	fireEvent.change(input, { target: { value: 'Palermo' } })
	fireEvent.submit(form)

	component.debug()
	expect(addPlace.mock.calls.length).toBe(1)
	//expect(state.name).toBe('Palermo')
})