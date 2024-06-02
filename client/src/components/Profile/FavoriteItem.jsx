import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Comments from "../../components/Comments";

// FavoriteItem component displays a favorite art item with options to remove, buy, and comment
const FavoriteItem = ({
  art,
  handleRemoveArt,
  handleBuyPrint,
  commentTexts,
  setCommentTexts,
  handleAddComment,
  handleKeyPress,
}) => (
  <li className="flex flex-col justify-between p-4 border border-gray-300 rounded-lg shadow-lg bg-white h-full">
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
      <h3 className="text-xl font-semibold mb-2 text-center">{art.title}</h3>
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
        handleKeyPress={(e) =>
          handleKeyPress(e, () => handleAddComment(art.id))
        }
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
);

export default FavoriteItem;
