import React from 'react'

const Post = ({ post }) => {
	return (
		<li className='post'>
			{post.content}
		</li>
	)
}

export default Post