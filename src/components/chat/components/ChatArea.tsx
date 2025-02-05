
import { Send, Plus, UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ChatAreaProps {
  selectedChat: string | null
  contacts: Array<{ id: string; name: string }>
  groups: Array<{ id: string; name: string }>
}

export function ChatArea({ selectedChat, contacts, groups }: ChatAreaProps) {
  const [message, setMessage] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    try {
      // TODO: Implement the actual POST request to your backend
      console.log("Sending message:", message)
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
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
      )}

      {/* Floating Action Button */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="absolute bottom-6 right-6 h-12 w-12 rounded-full"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Chat</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-4">
            <Button
              onClick={() => {
                // TODO: Implement private chat creation
                setIsCreateDialogOpen(false)
              }}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-5 w-5" />
              New Private Chat
            </Button>
            <Button
              onClick={() => {
                // TODO: Implement group creation
                setIsCreateDialogOpen(false)
              }}
              className="flex items-center gap-2"
            >
              <Users className="h-5 w-5" />
              Create Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
