import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_DATA } from "../utils/queries";
import { REMOVE_ART, UPDATE_USERNAME } from "../utils/mutations";
import ProfileHeader from "../components/Profile/ProfileHeader";
import UpdateUsernameForm from "../components/Profile/UpdateUsernameForm";
import TabNavigation from "../components/Profile/TabNavigation";
import Favorites from "../components/Profile/Favorites";
import OrderHistory from "../components/Shop/OrderHistory";
import { useCart } from "../context/CartContext";

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_USER_DATA);
  const { addToCart } = useCart();

  const [removeArt] = useMutation(REMOVE_ART, {
    refetchQueries: [{ query: GET_USER_DATA }],
  });

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

  return (
    <div className="profile-page container mx-auto px-4 pb-8 flex flex-col items-center bg-light-green">
      <ProfileHeader username={username} />
      <UpdateUsernameForm
        showUpdateField={showUpdateField}
        setShowUpdateField={setShowUpdateField}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        handleUpdateUsername={handleUpdateUsername}
        updateUsernameError={updateUsernameError}
        handleKeyPress={handleKeyPress}
        setIsUpdateButtonVisible={setIsUpdateButtonVisible}
      />
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
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "favorites" && (
        <Favorites
          favorites={favorites}
          handleRemoveArt={handleRemoveArt}
          handleBuyPrint={handleBuyPrint}
          commentTexts={commentTexts}
          setCommentTexts={setCommentTexts}
          handleAddComment={handleAddComment}
          handleKeyPress={handleKeyPress}
        />
      )}
      {activeTab === "order-history" && <OrderHistory />}
    </div>
  );
};

export default Profile;
