import axios from 'axios'
const baseUrl = '/api/places'

const getAll = () => {
	const request = axios.get(baseUrl)
	const nonExisting = {
		id: 10000,
		name: 'This note is not saved to server',
		description: 'hello',
		location: 'palermo',
		date: '2019-05-30T17:30:31.098Z'
	}
	return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

const remove = async (id, name) => {
	console.log(id);
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then(response => response.data)
}

export default { getAll, create, update, remove }