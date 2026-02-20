import { TabbedContent } from '@/components/TabbedContent'
import { MapPin, Radar, ListTree, LayoutGrid, Settings, Plane } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { InsetWindow } from '@/components/InsetWindow'

export function LeftPanel() {
  const tabs = [
    {
      id: 'locations',
      icon: MapPin,
      label: 'Locations',
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Locations</h3>
          <div className="space-y-2">
            <div className="text-sm">CYUL - Montreal</div>
            <div className="text-sm">CYOW - Ottawa</div>
            <div className="text-sm">CYVR - Vancouver</div>
          </div>
        </div>
      )
    },
    {
      id: 'radar',
      icon: Radar,
      label: 'Radar',
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Radar Settings</h3>
          <div className="space-y-2">
            <div className="text-sm">Range: 50nm</div>
            <div className="text-sm">Filter: All traffic</div>
          </div>
        </div>
      )
    },
    {
      id: 'target',
      icon: Plane,
      label: 'Target',
      content: (
        <Card className="rounded-none border-0 shadow-none p-0">
          <CardHeader className="p-2 m-0">
            <CardTitle className="text-sm font-light">Scenario List</CardTitle>
          </CardHeader>
          <CardContent className="p-0 m-0">
            <div className="text-muted-foreground p-2 space-y-1">
              <div className="text-sm">Scenario 1</div>
              <div className="text-sm">Scenario 2</div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: 'layout',
      icon: LayoutGrid,
      label: 'Layout',
      content: <InsetWindow />
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      position: 'bottom' as const, // This pushes it to the bottom
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Settings</h3>
        </div>
      )
    }
  ]

  return <TabbedContent tabs={tabs} defaultTab="locations" side="left" orientation="vertical" />
}
