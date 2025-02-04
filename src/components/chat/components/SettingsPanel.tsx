
import { Button } from "@/components/ui/button"

export function SettingsPanel() {
  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-semibold">Settings</h3>
      <Button variant="destructive" className="w-full">
        Disconnect
      </Button>
    </div>
  )
}
