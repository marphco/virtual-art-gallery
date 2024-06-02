import React from "react";
import FavoriteItem from "./FavoriteItem";
import { Container } from 'react-bootstrap';


const Favorites = ({
  favorites,
  handleRemoveArt,
  handleBuyPrint,
  commentTexts,
  setCommentTexts,
  handleAddComment,
  handleKeyPress,
}) => (
  <>
    <Container
      id="your-favorites"
      className="flex justify-center flex-col mt-8"
    >
      <h2 className="text-3xl font-bold text-center">Your Favorites</h2>
      <p className="text-lg mb-6 text-center p-6">
        Discover the masterpieces you've favorited! This section showcases the
        artworks you've loved the most. Enjoy a personalized collection of your
        favorite pieces, complete with artist details and your personal
        comments.
      </p>
    </Container>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
      {favorites.map((art) => (
        <FavoriteItem
          key={art.id}
          art={art}
          handleRemoveArt={handleRemoveArt}
          handleBuyPrint={handleBuyPrint}
          commentTexts={commentTexts}
          setCommentTexts={setCommentTexts}
          handleAddComment={handleAddComment}
          handleKeyPress={handleKeyPress}
        />
      ))}
    </ul>
  </>
);

export default Favorites;
