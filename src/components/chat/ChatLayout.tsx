import { useState } from "react"
import { Settings, Send, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Contact {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  image: string
}

interface Group {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  image: string
}

// Dummy data for demonstration
const contacts: Contact[] = [
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

const groups: Group[] = [
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
  const [showSettings, setShowSettings] = useState(false)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (!message.trim()) return
    // TODO: Implement message sending logic
    setMessage("")
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-sidebar-foreground">Chats</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4">
              <Input
                type="search"
                placeholder="Search chats..."
                className="w-full"
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            {!showSettings ? (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Contacts</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {contacts.map((contact) => (
                        <SidebarMenuItem key={contact.id}>
                          <SidebarMenuButton
                            onClick={() => setSelectedChat(contact.id)}
                            className={cn(
                              "flex items-start gap-3 p-3",
                              selectedChat === contact.id &&
                                "bg-sidebar-accent text-sidebar-accent-foreground"
                            )}
                          >
                            <img
                              src={contact.image}
                              alt={contact.name}
                              className="h-12 w-12 rounded-full"
                            />
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">
                                  {contact.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {contact.timestamp}
                                </span>
                              </div>
                              <p className="mt-1 truncate text-sm text-muted-foreground">
                                {contact.lastMessage}
                              </p>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Groups</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {groups.map((group) => (
                        <SidebarMenuItem key={group.id}>
                          <SidebarMenuButton
                            onClick={() => setSelectedChat(group.id)}
                            className={cn(
                              "flex items-start gap-3 p-3",
                              selectedChat === group.id &&
                                "bg-sidebar-accent text-sidebar-accent-foreground"
                            )}
                          >
                            <img
                              src={group.image}
                              alt={group.name}
                              className="h-12 w-12 rounded-full"
                            />
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">{group.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {group.timestamp}
                                </span>
                              </div>
                              <p className="mt-1 truncate text-sm text-muted-foreground">
                                {group.lastMessage}
                              </p>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            ) : (
              <div className="p-4">
                <h3 className="mb-4 text-lg font-semibold">Settings</h3>
                <Button variant="destructive" className="w-full">
                  Disconnect
                </Button>
              </div>
            )}
          </SidebarContent>
        </Sidebar>

        <main className="flex flex-1 flex-col">
          {selectedChat ? (
            <>
              <div className="border-b p-4">
                <h2 className="text-lg font-semibold">
                  {contacts.find((c) => c.id === selectedChat)?.name ||
                    groups.find((g) => g.id === selectedChat)?.name}
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Chat messages will go here */}
              </div>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Welcome to Chat</h2>
                <p className="mt-2 text-muted-foreground">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  )
}