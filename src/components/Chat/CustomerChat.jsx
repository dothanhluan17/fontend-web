import React, { useEffect, useState, useRef } from 'react';
import './CustomerChat.css';

const CustomerChat = () => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const chatRef = useRef();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  useEffect(() => {
    const fetchConversation = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/api/chat/conversation', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setConversation(data);
        } else {
          console.error(data.message || 'Không thể lấy cuộc trò chuyện');
        }
      } catch (error) {
        console.error('Lỗi khi fetch conversation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversation?._id || !token) return;
      try {
        const res = await fetch(`http://localhost:5000/api/chat/messages/${conversation._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Lỗi khi fetch messages:', error);
      }
    };

    fetchMessages();
  }, [conversation, token]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (!conversation?._id) {
      alert("Không thể gửi tin nhắn vì chưa có cuộc trò chuyện.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationId: conversation._id,
          text: newMessage,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, data]);
        setNewMessage('');
      } else {
        alert(data.message || 'Gửi tin nhắn thất bại.');
      }
    } catch (err) {
      console.error('Lỗi gửi tin nhắn:', err);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) return <div className="chat-container">Đang tải hỗ trợ...</div>;

  return (
    <div className="chat-container">
      <h3>💬 Hỗ trợ trực tuyến</h3>
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat-message ${msg.sender._id === user._id ? 'user' : 'admin'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default CustomerChat;
