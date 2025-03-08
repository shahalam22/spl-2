// // app/messages/page.js
// 'use client';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import SingleConversation from '@/components/singleConversation/SingleConversation';
// import Button from '@/components/button/Button';
// import { FaPaperPlane } from 'react-icons/fa';
// import HeaderAuth from '@/components/headerAuth/HeaderAuth';

// // Connect to the Socket.IO server
// const socket = io("http://localhost:5000");

// function Messages() {
//   // For demo purposes, we set a static list.
//   // In a real app, you’d likely fetch conversations and messages via your REST API.
//   const [conversations, setConversations] = useState([
//     {
//       id: 1,
//       sender: 'Grant Marshall',
//       receiver: 'Alexa',
//       lastMessage: { id: 1, message: 'Hello, how are you doing?', createdAt: '2021-09-01T12:00:00' }
//     },
//     // ... additional conversations
//   ]);

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
  
//   // In a real app, get the current user's ID from your auth system
//   const currentUserId = 14;  
//   const receiverUserId = 15; // the ID of the user you are chatting with

//   useEffect(() => {
//     // Join the socket room with your user ID
//     socket.emit("join", currentUserId);

//     // Listen for messages sent to this user
//     socket.on("receiveMessage", (message) => {
//       setMessages(prevMessages => [...prevMessages, message]);
//     });

//     // Optionally, listen for confirmation of message sent
//     socket.on("messageSent", (message) => {
//       console.log("Message sent:", message);
//     });

//     // Cleanup listener on component unmount
//     return () => {
//       socket.off("receiveMessage");
//       socket.off("messageSent");
//     };
//   }, [currentUserId]);

//   // Handle sending a message
//   const handleSend = () => {
//     if (input.trim() === '') return;

//     const messageData = {
//       sender_id: currentUserId,
//       receiver_id: receiverUserId,
//       isRead: false,
//       content: input,
//       createdAt: new Date().toISOString()
//     };

//     // Emit the message via Socket.IO
//     socket.emit("sendMessage", messageData);
//     // Optionally update your UI immediately (optimistic update)
//     setMessages(prevMessages => [...prevMessages, messageData]);
//     setInput('');
//   };

//   return (
//     <>
//         <HeaderAuth />
//         <div className="flex gap-2 flex-col md:flex-row">
//           <div className="w-auto md:w-[50%] flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg">
//             <p className="text-xl font-semibold">Conversations</p>
//             {conversations.map(conversation => (
//               <SingleConversation conversation={conversation} key={conversation.id} />
//             ))}
//             <div className="w-40 m-auto mt-5">
//               <Button variant="black" size="block">Load more</Button>
//             </div>
//           </div>
//           <div className="w-auto md:w-[50%] flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg">
//             <p className="text-xl font-semibold">Chat</p>
//             <div className="bg-white p-5 rounded-lg">
//               {messages.map((msg, index) => (
//                 <div 
//                   key={index} 
//                   className={msg.sender_id === currentUserId ? 'flex gap-4 flex-row-reverse my-5 items-center' : 'flex gap-4 items-center my-5'}
//                 >
//                   <img className="w-8 h-8 rounded-full" src="/grant1.jpg" alt="user" />
//                   <p className="bg-gray-100 px-5 py-2 rounded-full">{msg.content}</p>
//                 </div>
//               ))}
//               <div className="flex gap-2 items-center">
//                 <input
//                   type="text"
//                   placeholder="Type a message"
//                   className="w-full p-3 border-none bg-gray-100 rounded-lg"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                 />
//                 <div className="w-9">
//                   <Button variant="black" size="block" onClick={handleSend}>
//                     <FaPaperPlane className="m-auto" />
//                   </Button>
//                 </div>    
//               </div>
//             </div>
//           </div>
//         </div>
//     </>
//   );
// }

// export default Messages;




















'use client';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SingleConversation from '@/components/singleConversation/SingleConversation';
import Button from '@/components/button/Button';
import { FaPaperPlane } from 'react-icons/fa';
import HeaderAuth from '@/components/headerAuth/HeaderAuth';

// Initialize the socket connection (DO NOT change this to preserve socket programming)
const socket = io("http://localhost:5000");

function Messages() {
  // In a real app, currentUserId would come from your auth system.
  const currentUserId = 14;  
  // State to hold all messages fetched from the server.
  const [allMessages, setAllMessages] = useState([]);
  // Conversation list built by grouping messages per conversation partner.
  const [conversations, setConversations] = useState([]);
  // The currently selected conversation (set when a user clicks one)
  const [selectedConversation, setSelectedConversation] = useState(null);
  // Chat messages for the selected conversation.
  const [chatMessages, setChatMessages] = useState([]);
  // Input for sending a new message.
  const [input, setInput] = useState('');
 
  // Use a ref to ensure the socket listener always has the current selectedConversation.
  const selectedConversationRef = useRef(selectedConversation);
  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // On mount, join the user’s socket room and fetch all messages.
  useEffect(() => {
    socket.emit("join", currentUserId);
   
    fetch('/api/messages', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => {
         if(data.success){
           setAllMessages(data.data);
           // Group messages by the conversation partner.
           // For a message, if the sender is the current user, then the partner is the receiver and vice versa.
           const convMap = new Map();
           data.data.forEach(msg => {
             const partnerId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
             if(convMap.has(partnerId)){
               const existing = convMap.get(partnerId);
               // Update lastMessage if this one is newer.
               if(new Date(msg.createdAt) > new Date(existing.lastMessage.createdAt)){
                 convMap.set(partnerId, {
                   id: partnerId,
                   lastMessage: msg,
                   sender: msg.sender_id === currentUserId ? "You" : msg.sender_name || "Unknown",
                   receiver: msg.receiver_id
                 });
               }
             } else {
               convMap.set(partnerId, {
                 id: partnerId,
                 lastMessage: msg,
                 sender: msg.sender_id === currentUserId ? "You" : msg.sender_name || "Unknown",
                 receiver: msg.receiver_id
               });
             }
           });
           setConversations(Array.from(convMap.values()));
         }
      })
      .catch(err => console.error("Error fetching messages:", err));
  }, [currentUserId]);

  // Register socket listeners (registered only once) to update message state when new messages arrive.
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      setAllMessages(prev => [...prev, message]);
      const currentConv = selectedConversationRef.current;
      if (
        currentConv &&
        ((message.sender_id === currentUserId && message.receiver_id === currentConv.id) ||
         (message.sender_id === currentConv.id && message.receiver_id === currentUserId))
      ) {
        setChatMessages(prev => [...prev, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messageSent", (message) => {
      console.log("Message sent:", message);
    });

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messageSent");
    };
  }, [currentUserId]);

  // Handle clicking on a conversation from the list.
  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    // Filter all messages to only those between the current user and the selected partner.
    const filtered = allMessages.filter(msg =>
      (msg.sender_id === currentUserId && msg.receiver_id === conversation.id) ||
      (msg.sender_id === conversation.id && msg.receiver_id === currentUserId)
    );
    setChatMessages(filtered);
  };

  // Handle sending a message.
  const handleSend = () => {
    if(input.trim() === '' || !selectedConversation) return;

    const messageData = {
      sender_id: currentUserId,
      receiver_id: selectedConversation.id,
      isRead: false,
      content: input,
      createdAt: new Date().toISOString()
    };

    // Use socket programming to emit the message.
    socket.emit("sendMessage", messageData);
    // Optimistically update the UI.
    setAllMessages(prev => [...prev, messageData]);
    setChatMessages(prev => [...prev, messageData]);
    setInput('');
  };

  return (
    <>
      <HeaderAuth />
      <div className="flex gap-2 flex-col md:flex-row">
        {/* Conversation List */}
        <div className="w-auto md:w-[50%] flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg">
          <p className="text-xl font-semibold">Conversations</p>
          {conversations.map(conv => (
             <div key={conv.id} onClick={() => handleConversationClick(conv)}>
               <SingleConversation conversation={{
                 sender: conv.sender,
                 receiver: conv.receiver,
                 lastMessage: conv.lastMessage
               }}/>
             </div>
          ))}
          <div className="w-40 m-auto mt-5">
            <Button variant="black" size="block">Load more</Button>
          </div>
        </div>
        {/* Chat Conversation Area */}
        <div className="w-auto md:w-[50%] flex flex-col gap-4 m-5 p-5 bg-gray-100 rounded-lg">
          <p className="text-xl font-semibold">Chat</p>
          {selectedConversation ? (
          <div className="bg-white p-5 rounded-lg">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender_id === currentUserId ? 'flex gap-4 flex-row-reverse my-5 items-center' : 'flex gap-4 items-center my-5'}
              >
                <img className="w-8 h-8 rounded-full" src="/grant1.jpg" alt="user" />
                <p className="bg-gray-100 px-5 py-2 rounded-full">{msg.content}</p>
              </div>
            ))}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full p-3 border-none bg-gray-100 rounded-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="w-9">
                <Button variant="black" size="block" onClick={handleSend}>
                  <FaPaperPlane className="m-auto" />
                </Button>
              </div>    
            </div>
          </div>
          ) : (
            <p>Select a conversation to start chatting</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;