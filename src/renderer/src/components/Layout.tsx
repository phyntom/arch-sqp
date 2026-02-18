import React, { ReactNode } from 'react'
import AppHeader from './AppHeader'
import LeftPanel from './LeftPanel'
import { SidebarProvider } from './ui/sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider style={{ '--sidebar-width': '20rem' } as React.CSSProperties}>
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <AppHeader />
        <div className="flex flex-1 overflow-hidden mt-8">
          <LeftPanel />
          <main className="flex-1 overflow-hidden">{children}</main>
          {/* <RightPanel></RightPanel> */}
        </div>
        <footer className="w-full p-4 bg-background/95 backdrop-blur-sm h-12">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} My Electron App. All rights reserved.
          </div>
        </footer>
      </div>
    </SidebarProvider>
  )
}
