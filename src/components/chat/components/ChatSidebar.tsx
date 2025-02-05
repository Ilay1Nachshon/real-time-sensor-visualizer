
import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { ContactList } from "./ContactList"
import { GroupList } from "./GroupList"
import { SettingsPanel } from "./SettingsPanel"
import { SearchUsers } from "./SearchUsers"

interface ChatSidebarProps {
  selectedChat: string | null
  onSelectChat: (id: string) => void
}

export function ChatSidebar({ selectedChat, onSelectChat }: ChatSidebarProps) {
  const [showSettings, setShowSettings] = useState(false)

  const handleUserFound = (user: any) => {
    // TODO: Implement when backend is integrated
    console.log("User found:", user)
  }

  return (
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
      </SidebarHeader>
      <SidebarContent>
        {!showSettings ? (
          <>
            <SearchUsers onUserFound={handleUserFound} />
            <ContactList selectedChat={selectedChat} onSelectChat={onSelectChat} />
            <GroupList selectedChat={selectedChat} onSelectChat={onSelectChat} />
          </>
        ) : (
          <SettingsPanel />
        )}
      </SidebarContent>
    </Sidebar>
  )
}
