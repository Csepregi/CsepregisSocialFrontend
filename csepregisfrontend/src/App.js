import React, { useState, useEffect } from 'react'
import Place from './components/Place'
import Notification from './components/Notification'
import Footer from './components/Footer'
import placeService from './services/places'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import PlaceForm from './components/PlaceForm'
import { CardDeck } from 'react-bootstrap'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'

const App = () => {
  const [places, setPlaces] = useState([])
  // const [newName, setNewName] = useState('')
  // const [newDescription, setNewDescription] = useState('')
  // const [newLocation, setNewLocation] = useState('')
  const name = useField('text')
  const location = useField('text')
  const description = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedPlaceappUser', JSON.stringify(user)
      )

      placeService.setToken(user.token)
      setUser(user)
      // setUsername('')
      // setPassword('')
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



  const logOut = async () => {
    await window.localStorage.removeItem('loggedPlaceappUser');
    setUser(null)
  }

  const rows = () => places.map(place => <Place key={place.id} place={place} deletePlace={deletePlace} />)


  const addPlace = (event) => {
    event.preventDefault()
    placeFormRef.current.toggleVisibility()
    const placeObject = {
      name: name.value,
      description: description.value,
      location: location.value,
      date: new Date().toISOString(),
      id: places.length + 1,
    }

    placeService
      .create(placeObject)
      .then(data => {
        setPlaces(places.concat(data))
      })
    name.reset()
    location.reset()
    description.reset()
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleSubmit={handleLogin}
            // handleUsernameChange={({ target }) => setUsername(target.value)}
            // handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const placeFormRef = React.createRef()

  const placeForm = () => (
    <Togglable buttonLabel="new place" logOut={logOut} ref={placeFormRef}>
      <PlaceForm
        onSubmit={addPlace}
        name={name}
        description={description}
        location={location}
        logOut={logOut}
      />
    </Togglable>

  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Shared places</h1>

      <Notification message={errorMessage} />
      <div>
        <p>{user.name} logged in</p>
        {placeForm()}
      </div>
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