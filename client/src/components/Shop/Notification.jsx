import React from "react";
import logo from "../../assets/logo.svg"; 


// Notification component to display a notification popup
const Notification = ({ notification }) => (
  notification.visible && (
    <div className="popup fixed top-6 left-1/2 transform -translate-x-1/2 text-white p-4 rounded-md shadow-lg transition-all duration-300 flex items-center">
      <img
        src={notification.imageUrl}
        alt="item"
        className="w-10 h-10 rounded-full mr-2"
      />
      {notification.message}
    </div>
  )
);

export default Notification;
