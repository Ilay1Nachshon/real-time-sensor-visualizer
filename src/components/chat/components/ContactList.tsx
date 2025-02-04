
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface Contact {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  image: string
}

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

interface ContactListProps {
  selectedChat: string | null
  onSelectChat: (id: string) => void
}

export function ContactList({ selectedChat, onSelectChat }: ContactListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Contacts</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {contacts.map((contact) => (
            <SidebarMenuItem key={contact.id}>
              <SidebarMenuButton
                onClick={() => onSelectChat(contact.id)}
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
