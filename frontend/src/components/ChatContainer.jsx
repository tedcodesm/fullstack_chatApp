import { React, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthstore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const { messages, getmessages, isMessagesLoading, selectedUser , subscribeToMessages, unsubscribeFromMessages} =
    useChatStore();
  const { authuser } = useAuthStore();
  const messageEndRef = useRef(null)

  useEffect(() => {
    getmessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getmessages ,subscribeToMessages, unsubscribeFromMessages]);

  useEffect(()=>{
    if(messageEndRef.current && messages){
   messageEndRef.current.scrollIntoView({behavior: "smooth"})
  }
  }, [messages])

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authuser._id ? "chat-end" : "chart-start"
              }`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authuser._id
                        ? authuser.profilepic || "/user.png"
                        : selectedUser.profilepic || "/user.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.Image && (
                  <img
                    src={message.Image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
