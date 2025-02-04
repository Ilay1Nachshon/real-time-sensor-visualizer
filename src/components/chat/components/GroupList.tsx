
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface Group {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  image: string
}

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

interface GroupListProps {
  selectedChat: string | null
  onSelectChat: (id: string) => void
}

export function GroupList({ selectedChat, onSelectChat }: GroupListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Groups</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {groups.map((group) => (
            <SidebarMenuItem key={group.id}>
              <SidebarMenuButton
                onClick={() => onSelectChat(group.id)}
                className={cn(
                  "flex items-center gap-4 p-4", // Increased padding
                  "min-h-[4.5rem]", // 1.5x height
                  selectedChat === group.id &&
                    "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <div className="flex-shrink-0">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="h-16 w-16 rounded-full object-cover" // Increased size and proper object fitting
                  />
                </div>
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
  )
}
