
import { Plus, UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface CreateChatProps {
  onCreatePrivateChat: () => void
  onCreateGroup: () => void
}

export function CreateChat({ onCreatePrivateChat, onCreateGroup }: CreateChatProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              onCreatePrivateChat()
              setIsOpen(false)
            }}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-5 w-5" />
            New Private Chat
          </Button>
          <Button
            onClick={() => {
              onCreateGroup()
              setIsOpen(false)
            }}
            className="flex items-center gap-2"
          >
            <Users className="h-5 w-5" />
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
