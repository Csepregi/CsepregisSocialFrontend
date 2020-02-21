import React, { useState, useEffect } from 'react'
import Place from './components/Place'
import Notification from './components/Notification'
import Footer from './components/Footer'
import placeService from './services/places'
import { CardDeck } from 'react-bootstrap'

const App = () => {
  const [places, setPlaces] = useState([])
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    placeService
      .getAll()
      .then(initialPlaces => setPlaces(initialPlaces))
  }, [])

  const rows = () => places.map(place => <Place key={place.id} place={place} />)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }

  const handleLocationChange = (event) => {
    setNewLocation(event.target.value)
  }

  const addPlace = (event) => {
    event.preventDefault()
    const placeObject = {
      name: newName,
      description: newDescription,
      location: newLocation,
      date: new Date().toISOString(),
      id: places.length + 1,
    }

    placeService
      .create(placeObject)
      .then(data => {
        setPlaces(places.concat(data))
        setNewName('')
        setNewDescription('')
        setNewLocation('')
      })
  }

  return (
    <div>
      <h1>Shared places</h1>

      <Notification message={errorMessage} />

      <div>
      </div>
      <CardDeck>
        {rows()}
      </CardDeck>
      <form onSubmit={addPlace}>
        <div>
          <label>
            Name
          <input
              value={newName}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Description
          <input
              value={newDescription}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <div>
          <label>
            Location
          <input
              value={newLocation}
              onChange={handleLocationChange}
            />
          </label>
        </div>
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App 