import React, { useState, useEffect } from 'react'
import Place from './components/Place'
import Notification from './components/Notification'
import Footer from './components/Footer'
import placeService from './services/places'
import loginService from './services/login'
import { CardDeck } from 'react-bootstrap'

const App = () => {
  const [places, setPlaces] = useState([])
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    placeService
      .getAll()
      .then(initialPlaces => setPlaces(initialPlaces))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPlaceappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      placeService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedPlaceappUser', JSON.stringify(user)
      )

      placeService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //updating the placelist to render once blog has been deleted
  const deletePlace = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}`)) {
        placeService.remove(id, name).then(() => {
          setPlaces(places.filter(place => place.id !== id))
        })
      }
    }
  }

  const rows = () => places.map(place => <Place key={place.id} place={place} deletePlace={deletePlace} />)

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const placeForm = () => (
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
  )

  return (
    <div>
      <h1>Shared places</h1>

      <Notification message={errorMessage} />
      <h2>Login</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {placeForm()}
        </div>
      }
      <div>
      </div>
      <h2>Locations</h2>
      <CardDeck>
        {rows()}
      </CardDeck>


      <Footer />
    </div>
  )
}

export default App 