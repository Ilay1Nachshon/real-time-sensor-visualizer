
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ChatAreaProps {
  selectedChat: string | null
  contacts: Array<{ id: string; name: string }>
  groups: Array<{ id: string; name: string }>
}

export function ChatArea({ selectedChat, contacts, groups }: ChatAreaProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (!message.trim()) return
    // TODO: Implement message sending logic
    setMessage("")
  }

  const selectedName =
    contacts.find((c) => c.id === selectedChat)?.name ||
    groups.find((g) => g.id === selectedChat)?.name

  if (!selectedChat) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Welcome to Chat</h2>
          <p className="mt-2 text-muted-foreground">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    )
  }

  return (
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
  )
}
