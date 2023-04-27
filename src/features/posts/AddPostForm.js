import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNewPost } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [addRequestStatus, setAddRequestStatus] = React.useState('idle')

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')

        await dispatch(addNewPost({ title, content, user: userId })).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.error('Failed to save the post: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  })

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
