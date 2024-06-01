import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_DATA } from "../utils/queries";
import { REMOVE_ART,  UPDATE_USERNAME } from "../utils/mutations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Zoom from 'react-medium-image-zoom';
import Error from '../assets/error.svg';
import CloseIcon from '../assets/close-icon.svg';
import Comments from '../components/Comments';
import OrderHistory from '../components/OrderHistory';
import { useCart } from '../context/CartContext';

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_USER_DATA);
  const { addToCart } = useCart();

  const [removeArt] = useMutation(REMOVE_ART, {
    refetchQueries: [{ query: GET_USER_DATA }],
  });

  // const [addComment] = useMutation(ADD_COMMENT, {
  //   refetchQueries: [{ query: GET_USER_DATA }],
  // });

  const [updateUsername, { error: updateUsernameError }] = useMutation(
    UPDATE_USERNAME,
    {
      refetchQueries: [{ query: GET_USER_DATA }],
    }
  );

  const [commentTexts, setCommentTexts] = useState({});
  const [activeTab, setActiveTab] = useState("favorites");
  const [newUsername, setNewUsername] = useState("");
  const [showUpdateField, setShowUpdateField] = useState(false);
  const [isUpdateButtonVisible, setIsUpdateButtonVisible] = useState(true);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8">Error: {error.message}</p>;

  const favorites = data.me.savedArt;
  const username = data.me.username;

  const handleRemoveArt = async (artId) => {
    try {
      await removeArt({
        variables: { artId },
      });
      refetch();
    } catch (error) {
      console.error("Error removing artwork:", error);
    }
  };

  const handleBuyPrint = (art) => {
    addToCart({
      id: art.id,
      title: art.title,
      price: 15.0,
      quantity: 1,
    });

    window.location.href = "/checkout";
  };

  const handleAddComment = async (artId) => {
    const commentText = commentTexts[artId];

    if (!commentText) {
      console.warn("Comment text is empty. No comment will be added.");
      return;
    }

    try {
      await addComment({
        variables: {
          artworkId: artId,
          text: commentTexts[artId],
        },
      });

      setCommentTexts((prevState) => ({
        ...prevState,
        [artId]: "",
      }));

      refetch();
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.message,
        error.networkError,
        error.graphQLErrors
      );
    }
  };

  const handleUpdateUsername = async () => {
    try {
      await updateUsername({
        variables: { newUsername },
      });
      refetch();
      setNewUsername("");
      setShowUpdateField(false);
      setIsUpdateButtonVisible(true);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleKeyPress = (event, callback) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callback();
    }
  };

  const renderFavorites = () => (
    <>
      <Container
        id="your-favorites"
        className="flex justify-center flex-col mt-8"
      >
        <h2 className="text-3xl font-bold text-center">Your Favorites</h2>
        <p className="text-lg mb-6 text-center p-6">
          Discover the masterpieces you've favorited! This section showcases the
          artworks you've loved the most. Enjoy a personalized collection of
          your favorite pieces, complete with artist details and your personal
          comments.
        </p>
      </Container>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
        {favorites.map((art) => (
          <li
            key={art.id}
            className="flex flex-col justify-between p-4 border border-gray-300 rounded-lg shadow-lg bg-white h-full"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                {art.artist_titles && (
                  <span className="artist-name inline-block px-2 py-1 pl-3 pr-3 rounded-full mr-2 mb-1">
                    {art.artist_titles}
                  </span>
                )}
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleRemoveArt(art.id)}
                className="text-red-500 cursor-pointer hover:text-red-600"
              />
            </div>
            <div>
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-center">
                {art.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center">{art.description}</p>
              <Comments
                artId={art.id}
                commentText={commentTexts[art.id] || ""}
                setCommentText={(text) =>
                  setCommentTexts((prevState) => ({
                    ...prevState,
                    [art.id]: text,
                  }))
                }
                handleAddComment={() => handleAddComment(art.id)}
                handleKeyPress={(e) => handleKeyPress(e, () => handleAddComment(art.id))}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleBuyPrint(art)}
                className="flex justify-center items-center buy-print-btn text-white mx-auto px-4 pl-4 pr-4 py-2 rounded-full"
              >
                <FontAwesomeIcon
                  icon={faCartPlus}
                  className="text-white-500 pr-3 cursor-pointer "
                />{" "}
                Buy Print
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div className="profile-page container mx-auto px-4 pb-8 flex flex-col items-center bg-light-green">
      <h1 className="title-page text-3xl font-bold mb-4 text-center">
        Your Profile
      </h1>
      <p className="text-center py-4 mb-4 text-xl">
        Hello, <strong>{username}</strong>!
      </p>

      {showUpdateField && (
        <div className="mb-8 w-full max-w-md mx-auto">
          <h3 className="text-xl text-center font-semibold mb-4">Edit Username</h3>
          <div className="flex justify-center items-center mb-3">
            <img src={CloseIcon} alt="close" className="h-6 pr-2 cursor-pointer" onClick={() => { setShowUpdateField(false); setIsUpdateButtonVisible(true); }} />
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="New Username"
              className="search-bar flex p-2 border border-gray-300 rounded-l-full"
              onKeyPress={(e) => handleKeyPress(e, handleUpdateUsername)}
            />
            <button
              onClick={handleUpdateUsername}
              type="submit"
              className="save-btn py-2 px-6 text-white rounded-r-full"
            >
              Save
            </button>
          </div>
          {updateUsernameError && (
            <div className="flex justify-center mx-auto items-center">
              <img src={Error} alt="success" className="h-4 flex items-center justify-center pr-1" />
              <p className="username-error flex justify-center items-center">
                {updateUsernameError.message}
              </p>
            </div>
          )}
        </div>
      )}

      {isUpdateButtonVisible && (
        <div className="mb-8">
          <button
            onClick={() => {
              setShowUpdateField(true);
              setIsUpdateButtonVisible(false);
            }}
            className="update-btn mx-2 px-4 py-2 text-white rounded-full"
          >
            Update Username
          </button>
        </div>
      )}

      <div className="mb-8 flex flex-wrap justify-center">
        <button
          onClick={() => setActiveTab("favorites")}
          className={`mx-2 px-4 py-2 ${
            activeTab === "favorites"
              ? "fav-btn text-white"
              : "bg-gray-200 text-gray-800 rounded-full"
          } mb-2`}
        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab("order-history")}
          className={`mx-2 px-4 py-2 ${
            activeTab === "order-history"
              ? "order-history-btn text-white"
              : "bg-gray-200 text-gray-800 rounded-full"
          } mb-2`}
        >
          Order History
        </button>
      </div>

      {activeTab === "favorites" && renderFavorites()}
      {activeTab === "order-history" && <OrderHistory />}
    </div>
  );
};

export default Profile;
