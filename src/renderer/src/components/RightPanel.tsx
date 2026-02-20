import { Plane, Clock, Box } from 'lucide-react'
import { TabbedContent } from './TabbedContent'

export function RightPanel() {
  const tabs = [
    {
      id: 'traffic',
      icon: Plane,
      label: 'Traffic',
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Live Traffic</h3>
          <div className="space-y-2 text-sm">
            <div>AC123 - 35,000ft</div>
            <div>WJ456 - 28,000ft</div>
          </div>
        </div>
      )
    },
    {
      id: 'details',
      icon: Box,
      label: 'Details',
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Aircraft Details</h3>
          <div className="space-y-2 text-sm">
            <div>Callsign: AC123</div>
            <div>Type: B787</div>
            <div>Altitude: 35,000ft</div>
          </div>
        </div>
      )
    },
    {
      id: 'timeline',
      icon: Clock,
      label: 'Timeline',
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Timeline</h3>
        </div>
      )
    }
  ]

  return (
    <>
      <div className="flex justify-evenly gap-1 w-full border-b bg-sidebar p-4 shrink-0">
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold">Zulu</span>
          <span className="text-xs text-muted-foreground">{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold">Date</span>
          <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      <TabbedContent tabs={tabs} defaultTab="traffic" side="right" orientation="horizontal" />
    </>
  )
}
