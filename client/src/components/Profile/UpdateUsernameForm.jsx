import React from "react";
import CloseIcon from "../../assets/close-icon.svg";
import Error from "../../assets/error.svg";

const UpdateUsernameForm = ({
  showUpdateField,
  setShowUpdateField,
  newUsername,
  setNewUsername,
  handleUpdateUsername,
  updateUsernameError,
  handleKeyPress,
  setIsUpdateButtonVisible,
}) =>
  showUpdateField && (
    <div className="mb-8 w-full max-w-md mx-auto">
      <h3 className="text-xl text-center font-semibold mb-4">Edit Username</h3>
      <div className="flex justify-center items-center mb-3">
        <img
          src={CloseIcon}
          alt="close"
          className="h-6 pr-2 cursor-pointer"
          onClick={() => {
            setShowUpdateField(false);
            setIsUpdateButtonVisible(true);
          }}
        />
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
          <img
            src={Error}
            alt="error"
            className="h-4 flex items-center justify-center pr-1"
          />
          <p className="username-error flex justify-center items-center">
            {updateUsernameError.message}
          </p>
        </div>
      )}
    </div>
  );

export default UpdateUsernameForm;
