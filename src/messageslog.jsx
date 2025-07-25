import React, { useState, useEffect, useRef } from 'react';

function MessageLogPage() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageBoxMessage, setMessageBoxMessage] = useState('');
  const [messageBoxType, setMessageBoxType] = useState('');

  const [userId] = useState(() => `agent-${Math.random().toString(36).substring(2, 10)}`);

  const messagesEndRef = useRef(null);

  const showMessageBox = (msg, type) => {
    setMessageBoxMessage(msg);
    setMessageBoxType(type);
    setTimeout(() => {
      setMessageBoxMessage('');
      setMessageBoxType('');
    }, 3000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!messageInput.trim()) {
      showMessageBox("Message cannot be empty.", 'failure');
      return;
    }

    const newMessage = {
      id: Date.now(),
      senderId: userId,
      content: messageInput.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInput('');
    showMessageBox("Message sent!", 'success');
  };

  return (
    <div className="p-6 bg-[#0D1117] min-h-full flex flex-col">
      <h1 className="text-4xl font-extrabold text-[#FDE047] mb-6 tracking-wide">SECURE COMMUNICATIONS</h1>

      {messageBoxMessage && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${messageBoxType === 'success' ? 'bg-[#39FF14]' : 'bg-[#FF3131]'} text-white`}>
          {messageBoxMessage}
        </div>
      )}

      <div className="bg-[#161B22] p-6 rounded-lg shadow-xl border border-[#30363D] flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-[#FDE047] mb-4">Message Log</h2>
        <div className="flex-grow bg-[#0D1117] p-4 rounded-md overflow-y-auto mb-4 border border-[#30363D]">
          {messages.length === 0 ? (
            <p className="text-[#C9D1D9] text-center">No messages yet. Start a secure conversation!</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`mb-3 p-3 rounded-lg ${msg.senderId === userId ? 'bg-[#0056B3] ml-auto' : 'bg-[#30363D] mr-auto'} max-w-[80%]`}>
                <p className="text-sm text-[#C9D1D9] mb-1">
                  {msg.senderId === userId ? 'You' : `Agent ${msg.senderId.substring(0, 8)}...`} at {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
                <p className="text-white">{msg.content}</p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input and Send Button - Styled for better integration */}
        <div className="flex items-center space-x-3 mt-4 p-2 bg-[#0D1117] rounded-md border border-[#30363D]"> {/* Added padding, background, border */}
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your secure message..."
            className="flex-grow p-2 rounded-md bg-transparent text-[#C9D1D9] border-none focus:outline-none focus:ring-0" // Removed border, transparent background
            onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button
            onClick={sendMessage}
            className="bg-[#1A5229] hover:bg-[#153F20] text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageLogPage;