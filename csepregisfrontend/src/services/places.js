import axios from 'axios'
const baseUrl = '/api/places'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

const remove = async (id, name) => {
	console.log(id);
	const authoriz = {
		headers: { Authorization: token },
	}
	const request = axios.delete(`${baseUrl}/${id}`, authoriz);
	return request.then(response => response.data)
}

export default { getAll, create, update, remove, setToken }