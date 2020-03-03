import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/places')
import App from './App'

describe('<App />', () => {
	test('renders all places it gets from backend', async () => {
		const component = render(
			<App />
		)
		component.rerender(<App />)
		await waitForElement(
			() => component.container.querySelector('.place')
		)

		const notes = component.container.querySelectorAll('.place')
		expect(notes.length).toBe(3)

		expect(component.container).toHaveTextContent(
			'Posilipo'
		)
		expect(component.container).toHaveTextContent(
			'Roma'
		)
	})
})