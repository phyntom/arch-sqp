import { Button } from './ui/button'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

interface SidebarToggleProps {
  isOpen: boolean
  setIsOpen: () => void
  side: "left" | "right"
}

function SidebarToggle({ isOpen, setIsOpen, side="left" }: SidebarToggleProps) {
  const handleToggle = () => {
    if (side === "right") {
      return isOpen ? <PanelLeftOpen className="size-6" /> : <PanelLeftClose className="size-6" />
    }
    return isOpen ? <PanelLeftClose className="size-6" /> : <PanelLeftOpen className="size-6" />
  }

  return (
    <div className="invisible sm:visible">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md"
        variant="ghost"
        size="icon-lg"
        data-inline="start"
      >
        {handleToggle()}
      </Button>
    </div>
  )
}

export default SidebarToggle
