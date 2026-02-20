import SidebarToggle from './SidebarToggle'
import Logo from './Logo'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export interface AppHeaderProps {
  onToggleLeft: () => void
  onToggleRight: () => void
  leftCollapsed: boolean
  rightCollapsed: boolean
}

function AppHeader({ onToggleLeft, onToggleRight, leftCollapsed, rightCollapsed }: AppHeaderProps) {
  return (
    <div>
      <header className="sticky top-0 bg-gray-800 text-white w-full z-50 h-12 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 shadow-sm h-full">
          <div className="flex items-center gap-2 h-6 text-sm">
            <Button variant="ghost" size="sm" className="p-0 hover:bg-gray-700">
              <Menu />
            </Button>
            <span className="hidden sm:block text-lg font-light">Adacel</span>
            <Separator orientation="vertical" />
            <Logo />
          </div>
          <div className="flex gap-2">
            {/* <SidebarToggle isOpen={open} setIsOpen={toggleSidebar} side="left" /> */}
            <SidebarToggle isOpen={leftCollapsed} setIsOpen={onToggleLeft} side="right" />
            <SidebarToggle isOpen={rightCollapsed} setIsOpen={onToggleRight} side="left" />
          </div>
        </div>
      </header>
    </div>
  )
}

export default AppHeader
