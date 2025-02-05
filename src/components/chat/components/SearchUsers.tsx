
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axiosInstance from "@/lib/axios"

interface SearchUsersProps {
  onUserFound: (user: any) => void
}

export function SearchUsers({ onUserFound }: SearchUsersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    try {
      // TODO: Replace with actual API endpoint when backend is integrated
      const response = await axiosInstance.post('/users/search', {
        query: searchQuery.trim()
      })
      onUserFound(response.data)
    } catch (error) {
      console.error('Failed to search users:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="flex gap-2 p-4">
      <Input
        type="search"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1"
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
  )
}
