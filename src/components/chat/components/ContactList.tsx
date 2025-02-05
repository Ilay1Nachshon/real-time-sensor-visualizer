
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Plus, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Contact {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  image: string
}

interface ContactListProps {
  selectedChat: string | null
  onSelectChat: (id: string) => void
}

export function ContactList({ selectedChat, onSelectChat }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    try {
      // TODO: Implement actual API call to fetch users
      // This is a placeholder for the actual implementation
      console.log("Searching for users with query:", searchQuery)
    } catch (error) {
      console.error("Error searching for users:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <SidebarGroup className="flex-1">
      <SidebarGroupLabel>Contacts</SidebarGroupLabel>
      <div className="mb-4 px-4">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSearch}
            disabled={isSearching}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {contacts.map((contact) => (
            <SidebarMenuItem key={contact.id}>
              <SidebarMenuButton
                onClick={() => onSelectChat(contact.id)}
                className={cn(
                  "flex items-center gap-4 p-4",
                  "min-h-[4.5rem]",
                  "w-[24rem]",
                  selectedChat === contact.id &&
                    "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <div className="flex-shrink-0">
                  {contact.image === "/placeholder.svg" ? (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ) : (
                    <img
                      src={contact.image}
                      alt={contact.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{contact.name}</span>
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
  )
}
