import React from 'react'
import SidebarToggle from './SidebarToggle'
import Logo from './Logo'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'

function AppHeader() {
  const {open,toggleSidebar} = useSidebar();
  const [isRightOpen, setIsRightOpen] = React.useState(true)
  
  const handleRightOpen = () => setIsRightOpen((prev) => !prev)


  return (
    <div>
      <header className="sticky top-0 bg-gray-800 text-white w-full z-50 h-17.5 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 shadow-sm h-full">
          <div className="flex items-center gap-2 h-6 text-sm">
            <span className="hidden sm:block text-lg font-light">Adacel</span>
            <Separator orientation="vertical" />
            <Logo />
          </div>
          <div className="flex gap-2">
            <SidebarToggle isOpen={open} setIsOpen={toggleSidebar} side="left" />
            <SidebarToggle isOpen={isRightOpen} setIsOpen={handleRightOpen} side="right" />
          </div>
        </div>
      </header>
    </div>
  )
}

export default AppHeader
