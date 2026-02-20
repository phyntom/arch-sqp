import { useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface IconTab {
  id: string
  icon: LucideIcon
  label: string
  content: ReactNode
  position?: 'top' | 'bottom' // Optional: allows pushing items to bottom
}

export interface IconTabsProps {
  tabs: IconTab[]
  defaultTab?: string
  side?: 'left' | 'right'
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function TabbedContent({
  tabs,
  defaultTab,
  side = 'left',
  orientation = 'horizontal',
  className
}: IconTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const topTabs = tabs.filter((tab) => tab.position !== 'bottom')
  const bottomTabs = tabs.filter((tab) => tab.position === 'bottom')
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div
      className={cn(
        `flex h-full bg-background`,
        orientation === 'horizontal' ? 'flex-col' : 'flex-row',
        'w-full',
        className ?? className
      )}
    >
      <TooltipProvider>
        <div
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-row w-full' : 'flex-col w-12',
            'bg-sidebar p-1 gap-1 shrink-0',
            side === 'left' && orientation === 'vertical' && 'border-l-0 border-r',
            side === 'right' && orientation === 'vertical' && 'border-r-0 border-l order-1'
          )}
        >
          {/* Top tabs */}
          {topTabs.map((tab) => (
            <Tooltip key={tab.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn('w-10 h-10 p-0', activeTab === tab.id && 'bg-accent')}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side === 'left' ? 'right' : 'left'}>{tab.label}</TooltipContent>
            </Tooltip>
          ))}
          <div className="flex-1" />
          {/* Bottom tabs */}
          {bottomTabs.map((tab) => (
            <Tooltip key={tab.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn('w-10 h-10 p-0', activeTab === tab.id && 'bg-accent')}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side === 'left' ? 'right' : 'left'}>{tab.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      <div className="flex-1">{activeContent}</div>
    </div>
  )
}
