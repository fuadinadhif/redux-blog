import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { postUpdated } from './postsSlice'

export const EditPostForm = () => {
  const { postId } = useParams()

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = React.useState(post.title)
  const [content, setContent] = React.useState(post.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = (e) => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title: title, content: content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder={`What's on your mind?`}
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Post Content</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
