
import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ChatSidebar } from "./components/ChatSidebar"
import { ChatArea } from "./components/ChatArea"

const contacts = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    timestamp: "Yesterday",
    image: "/placeholder.svg",
  },
]

const groups = [
  {
    id: "1",
    name: "Project Team",
    lastMessage: "Meeting at 2 PM",
    timestamp: "12:45 PM",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Family Group",
    lastMessage: "Don't forget mom's birthday!",
    timestamp: "Yesterday",
    image: "/placeholder.svg",
  },
]

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full bg-background">
        <ChatSidebar
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
        <main className="flex flex-1 flex-col">
          <ChatArea
            selectedChat={selectedChat}
            contacts={contacts}
            groups={groups}
          />
        </main>
      </div>
    </SidebarProvider>
  )
}
