import React, { useState, useEffect } from 'react';

const Comments = ({ artId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${artId}`)) || [];
    setComments(storedComments);
  }, [artId]);

  const handleAddComment = () => {
    const newComment = { text: commentText, date: new Date() };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${artId}`, JSON.stringify(updatedComments));
    setCommentText('');
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`comments-${artId}`, JSON.stringify(updatedComments));
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment.text} <button onClick={() => handleDeleteComment(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add</button>
    </div>
  );
};

export default Comments;
