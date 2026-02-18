import { ChevronDown, LayoutGrid, MapPin, Plane, Radar, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { Separator} from "@/components/ui/separator"


const navItems = [
  { icon: Radar, label: 'Radar' },
  { icon: Plane, label: 'Scenarios' },
  { icon: LayoutGrid , label: 'Layout' }
]

function LeftPanel() {
  return (
    <Sidebar
      collapsible="icon"
      side="left"
      className="top-17.5 h-[calc(100vh-(--spacing(17.5))-(--spacing(12)))] border-0"
      variant="sidebar"
    >
<SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
            <MapPin className="size-5" />
            <span>Locations</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
    <Separator />
  </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton>
                  <item.icon className="size-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
       <Settings />
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}

export default LeftPanel
