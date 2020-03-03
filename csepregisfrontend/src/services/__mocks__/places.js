const places = [
	{
		id: "5e515544685db40da430992d",
		name: "Posilipo",
		description: "Canottaggio",
		location: "Napoli",
		user: {
			username: "gabor",
			name: "gabor",
			id: "5e510c3819a6084ac4a74ea6"
		}
	},
	{
		id: "5e515544685db40da430992e",
		name: "Sabaudia",
		description: "Canottaggio",
		location: "Roma",
		user: {
			username: "gabor",
			name: "gabor",
			id: "5e510c3819a6084ac4a74ea6"
		}
	},
	{
		id: "5e515544685db40da430992f",
		name: "Aniene",
		description: "Canottaggio",
		location: "Milano",
		user: {
			username: "gabor",
			name: "gabor",
			id: "5e510c3819a6084ac4a74ea6"
		}
	}
]

const getAll = () => {
	return Promise.resolve(places)
}

export default { getAll }