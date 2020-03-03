import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Place from './Place'

test('renders content', () => {
	const place = {
		name: "sleeping",
		description: "uscita",
		location: "Castle"
	}

	const mockHandler = jest.fn()

	const component = render(
		<Place place={place} deletePlace={mockHandler} />
	)

	expect(component.container).toHaveTextContent(
		'sleeping'
	)

	const element = component.getByText(
		'sleeping'
	)
	expect(element).toBeDefined()


	const div = component.container.querySelector('.place')
	expect(div).toHaveTextContent(
		'sleeping'
	)
})