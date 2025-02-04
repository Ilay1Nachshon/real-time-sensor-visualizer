
import { useState } from "react"
import { Settings, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ContactList } from "./ContactList"
import { GroupList } from "./GroupList"
import { SettingsPanel } from "./SettingsPanel"

interface ChatSidebarProps {
  selectedChat: string | null
  onSelectChat: (id: string) => void
}

export function ChatSidebar({ selectedChat, onSelectChat }: ChatSidebarProps) {
  const [showSettings, setShowSettings] = useState(false)

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
