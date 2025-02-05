import { CreateChat } from "./CreateChat"
import { MessageInput } from "./MessageInput"
import { useState } from "react"

interface ChatAreaProps {
  selectedChat: string | null
  contacts: Array<{ id: string; name: string }>
  groups: Array<{ id: string; name: string }>
}

export function ChatArea({ selectedChat, contacts, groups }: ChatAreaProps) {
  const handleCreatePrivateChat = () => {
    // TODO: Implement when backend is integrated
    console.log("Create private chat")
  }

  const handleCreateGroup = () => {
    // TODO: Implement when backend is integrated
    console.log("Create group")
  }

  const handleMessageSent = () => {
    // TODO: Implement message sent callback
    console.log("Message sent")
  }

  const selectedName =
    contacts.find((c) => c.id === selectedChat)?.name ||
    groups.find((g) => g.id === selectedChat)?.name

  return (
    <div className="relative flex h-full flex-col">
      {!selectedChat ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Welcome to Chat</h2>
            <p className="mt-2 text-muted-foreground">
              Select a chat to start messaging
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">{selectedName}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {/* Chat messages will go here */}
          </div>
          <MessageInput 
            selectedChat={selectedChat} 
            onMessageSent={handleMessageSent}
          />
        </>
      )}

      <CreateChat
        onCreatePrivateChat={handleCreatePrivateChat}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  )
}
