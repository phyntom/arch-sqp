import { ReactNode, useRef, useState } from 'react'
import AppHeader from './AppHeader'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'
import { Allotment, AllotmentHandle } from 'allotment'
import 'allotment/dist/style.css'

export function Layout({ children }: { children: ReactNode }) {
  const allotmentRef = useRef<AllotmentHandle>(null)
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)

  const toggleLeftPanel = () => {
    if (!allotmentRef.current) return

    const newState = !leftCollapsed
    setLeftCollapsed(newState)

    // Resize: [left, center, right]
    // Use 0 to fully hide, 48 for icon-only, 200 for expanded
    allotmentRef.current.resize([
      newState ? 28 : 220, // left panel
      Infinity,
      rightCollapsed ? 0 : 200 // right panel
    ])
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <AppHeader
        onToggleLeft={toggleLeftPanel}
        onToggleRight={() => setRightCollapsed((prev) => !prev)}
        leftCollapsed={leftCollapsed}
        rightCollapsed={rightCollapsed}
      />
      <Allotment className="flex-1 overflow-hidden" ref={allotmentRef}>
        <Allotment.Pane minSize={38} preferredSize={220}>
          <LeftPanel />
        </Allotment.Pane>
        <Allotment.Pane>
          <main className="flex-1 overflow-hidden">{children}</main>
        </Allotment.Pane>
        <Allotment.Pane minSize={48} preferredSize={220} snap visible={!rightCollapsed}>
          <RightPanel />
        </Allotment.Pane>
      </Allotment>
      <footer className="w-full p-4 bg-background/95 backdrop-blur-sm h-12">
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} My Electron App. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
