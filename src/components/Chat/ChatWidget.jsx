import React, { useState } from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';
import CustomerChat from './CustomerChat';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-box-widget">
          <CustomerChat />
        </div>
      )}

      <button className="chat-toggle-btn" onClick={toggleChat}>
        <FaFacebookMessenger size={28} />
      </button>
    </div>
  );
};

export default ChatWidget;
