
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axiosInstance from "@/lib/axios"

interface MessageInputProps {
  selectedChat: string | null
  onMessageSent: () => void
}

export function MessageInput({ selectedChat, onMessageSent }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return

    setIsSending(true)
    try {
      // TODO: Replace with actual API endpoint when backend is integrated
      await axiosInstance.post('/messages', {
        chatId: selectedChat,
        message: message.trim(),
      })
      setMessage("")
      onMessageSent()
      toast.success('Message sent successfully')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="border-t p-4">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          disabled={!selectedChat || isSending}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!selectedChat || isSending}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
