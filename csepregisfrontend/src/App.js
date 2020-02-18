import React, { useState, useEffect } from 'react'
import Post from './components/Post'
import Notification from './components/Notification'
import Footer from './components/Footer'
import postService from './services/posts'

const App = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    postService
      .getAll()
      .then(initialPosts => setPosts(initialPosts))
  }, [])


  const rows = () => posts.map(post =>
    <Post
      key={post.id}
      post={post}
    />
  )

  const handleNoteChange = (event) => {
    setNewPost(event.target.value)
  }

  const addPost = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newPost,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: posts.length + 1,
    }

    postService
      .create(noteObject)
      .then(data => {
        setPosts(posts.concat(data))
        setNewPost('')
      })
  }

  // const toggleImportanceOf = id => {
  //   const post = posts.find(n => n.id === id)
  //   const changedNote = { ...post, important: !note.important }

  // const updatePost = async (changedNote, id) => {
  //   const data = await postService.update(changedNote, id)
  //   // map blogs and change one which got liked
  //   const newPosts = [...posts].map(post => post.id === post.id ? data : post)
  //   setPosts(newPost)

  // postService
  //   .update(id, changedNote)
  //   .then(returnedNote => {
  //     setPosts(posts.map(note => note.id !== id ? post : returnedNote))
  //   })
  //   .catch(error => {
  //     setErrorMessage(
  //       `Note '${post.content}' was already removed from server`
  //     )
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 5000)
  //     setPosts(posts.filter(n => n.id !== id))
  //   })
  //}


  return (
    <div>
      <h1>Posts</h1>

      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addPost}>
        <input
          value={newPost}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App 