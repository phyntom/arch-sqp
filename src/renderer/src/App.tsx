import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { Button } from './components/ui/button'
import { Layout } from '@/components/Layout'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
      <Layout>
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={electronLogo} alt="Electron Logo" className="w-40 h-40" />
          <h1 className="text-2xl font-bold">Welcome to Electron with Vite and React!</h1>
          <Button onClick={ipcHandle}>Send IPC Message</Button>
          <Versions />
        </div>
      </Layout>
  )
}

export default App
