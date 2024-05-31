import React, { useState, useEffect } from 'react';
import Error from '../assets/error.svg';

const Comments = ({ artId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${artId}`)) || [];
    setComments(storedComments);
  }, [artId]);

  const handleAddComment = () => {
    if (commentText.trim() === '') {
      setCommentError('Comment cannot be blank.');
      return;
    }
    setCommentError('');
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div>
      <ul>
        {comments.map((comment, index) => (
          <li className="mb-3 italic" key={index}>
            {comment.text} <button className="text-sm ml-2 pt-1 pb-1 pl-3 pr-3 bg-red-600 rounded-full text-white hover:bg-red-800" onClick={() => handleDeleteComment(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center items-center mb-3">
        <input
          type="text"
          className="comment-bar w-full p-2 border border-gray-300 rounded-l-full"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          onKeyPress={handleKeyPress}
        />
        <button
          className="add-comment-btn py-2 px-6 text-white rounded-r-full"
          onClick={handleAddComment}
        >
          Add
        </button>
      </div>
      {commentError && (
        <div className="flex justify-center mx-auto items-center">
          <img src={Error} alt="error" className="h-4 flex items-center justify-center pr-1" />
          <p className="username-error flex justify-center items-center">
            {commentError}
          </p>
        </div>
      )}
    </div>
  );
};

export default Comments;
