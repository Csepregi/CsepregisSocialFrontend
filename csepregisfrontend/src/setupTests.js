// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each'

let savedItems = {}

const localStorageMock = {
	setItem: (key, item) => {
		savedItems[key] = item
	},
	getItem: (key) => savedItems[key],
	clear: () => {
		savedItems = {}
	}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })