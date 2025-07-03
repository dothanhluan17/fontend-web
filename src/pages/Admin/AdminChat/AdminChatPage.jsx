import React, { useEffect, useState } from 'react';
import './AdminChatPage.css';

const AdminChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const admin = JSON.parse(localStorage.getItem('user'));
  const token = admin?.token;

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('http://localhost:5000/api/chat/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setConversations(data);
    };

    fetchConversations();
  }, [token]);

  const loadMessages = async (conversationId) => {
    setSelectedConversation(conversationId);
    const res = await fetch(`http://localhost:5000/api/chat/messages/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const res = await fetch('http://localhost:5000/api/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ conversationId: selectedConversation, text: newMessage }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, data]);
    setNewMessage('');
  };

  return (
    <div className="admin-chat-container">
      <div className="conversation-list">
        <h3>Khách hàng</h3>
        {conversations.map((c) => (
          <div
            key={c._id}
            className={`conversation-item ${selectedConversation === c._id ? 'active' : ''}`}
            onClick={() => loadMessages(c._id)}
          >
            {c.user?.name || c.user?.email}
          </div>
        ))}
      </div>
      <div className="message-area">
        {selectedConversation ? (
          <>
            <div className="messages">
              {messages.map((msg) => (
                <div key={msg._id} className={`message ${msg.sender._id === admin._id ? 'admin' : 'user'}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form className="message-input" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="Nhập phản hồi..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Gửi</button>
            </form>
          </>
        ) : (
          <p className="no-conversation">Chọn cuộc trò chuyện để xem</p>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;
