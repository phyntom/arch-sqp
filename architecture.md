# Scenario Quick Preview v1.0

## Electron + React + Embedded Express Architecture

---

## Overview

This document describes the architecture and setup for the **SQP (Scenario Quick Preview)** desktop application built with:

- **Electron** – Desktop application framework
- **React** – UI library (Vite + TypeScript)
- **Embedded Express server** – Backend services
- **Secure IPC bridge** – Inter-process communication
- **Modular enterprise-ready structure**

The goal is to keep things simple while maintaining clean separation of concerns and production-level security.

---

## 1. Create the Project

> **Prerequisites:** Make sure you have Node 20.19+,22.12+ and Vite version 5.0+ are installed.

```bash
npm create @quick-start/electron@latest scenario-quick-preview -- --template=react-ts
```

This will scaffold a project with:
- ⚡ Vite for blazing fast HMR
- 📝 TypeScript configured out of the box
- ⚛️ React template ready to use

Then:

```bash
cd scenario-quick-preview
npm install
```

---

## 2. Install Electron Builder (Enterprise Packaging)

```bash
npm install --save-dev electron-builder
```

Add build configuration to `package.json`:

```json
{
  "build": {
    "appId": "com.adacel.scenario-quick-preview",
    "productName": "Scenario Quick Preview",
    "directories": {
      "output": "release"
    },
    "win": {
      "target": ["nsis", "portable"],
      "icon": "build/icon.ico"
    },
    "mac": {
      "target": ["dmg", "zip"],
      "icon": "build/icon.icns"
    },
    "linux": {
      "target": ["AppImage", "deb"],
      "icon": "build/icon.png"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

Or create a separate `electron-builder.yml`:

```yaml
appId: com.adacel.scenario-quick-preview
productName: Scenario Quick Preview
directories:
  output: release

win:
  target:
    - nsis
    - portable
  icon: build/icon.ico

mac:
  target:
    - dmg
    - zip
  icon: build/icon.icns

linux:
  target:
    - AppImage
    - deb
  icon: build/icon.png

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
```

---

## 3. Secure Your Electron Config

Open `src/main/index.ts` and modify `BrowserWindow`:

```ts
import { join } from 'path';

const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false
  }
});
```

---

## 4. Setup Secure Preload Bridge

Edit `src/preload/index.ts`:

```ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getAppVersion: () => ipcRenderer.invoke('get-version'),
  // Add more API methods as needed
});
```

In `src/main/index.ts`, add the handler:

```typescript
import { ipcMain, app } from 'electron';

ipcMain.handle('get-version', () => {
  return app.getVersion();
});
```

Now your React app can safely use:

```ts
window.api.getAppVersion()
```

## 5. Configure electron-vite

The `electron.vite.config.ts` in the project root handles all build configurations:

```ts
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts')
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.ts')
        }
      }
    }
  },
  renderer: {
    root: 'src/renderer',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/index.html')
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer/src')
      }
    }
  }
});
```

---

## 6. Package.json Scripts

Update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "preview": "electron-vite preview",
    "package": "electron-vite build && electron-builder",
    "package:win": "electron-vite build && electron-builder --win",
    "package:mac": "electron-vite build && electron-builder --mac",
    "package:linux": "electron-vite build && electron-builder --linux"
  }
}
```

---

## 7. Run in Development

```bash
npm run dev
```

This will start with hot module replacement (HMR) for instant updates.

---

## 8. Build and Package

```bash
# Build the application
npm run build

# Package for current platform
npm run package

# Package for specific platforms
npm run package:win
npm run package:mac
npm run package:linux
```

This will generate installers in:

```
release/
```

---

## 9. Enterprise-Grade Additions (Recommended)

Install auto-updater:

```bash
npm install electron-updater
```

Install env management:

```bash
npm install dotenv
```

Configure auto-updater in `src/main/index.ts`:

```ts
import { autoUpdater } from 'electron-updater';

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

---

## 10. Architectural Principle

Electron app will include:

✅ React frontend (renderer)

✅ Electron main process

✅ A small embedded Express server (local backend)

✅ Enterprise-level structure

| Layer         | Responsibility        |
| --------------|-----------------------|
| Renderer      | UI only               |
| Main          | OS interaction        |
| Server        | Business logic / jobs |
| Preload       | Secure communication  |
| Shared        | Types                 |

---

## 11. Recommended Folder Structure

```
scenario-quick-preview/
│
├── src/
│   ├── main/                ← Electron main process
│   │   ├── index.ts
│   │   ├── window.ts
│   │   └── ipc/
│   │       ├── index.ts
│   │       └── handlers.ts
│   │       └── ...
│   │
│   ├── preload/             ← Secure API bridge
│   │   └── index.ts
│   │
│   ├── renderer/            ← React app
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── components/
│   │       ├── hooks/
│   │       └── services/
│   │       └── .../
│   │
│   ├── server/              ← Express backend (embedded)
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── middleware/
│   │   └── .../
│   │
│   └── shared/              ← Shared types/interfaces
│       └── types.ts
│
├── build/                   ← App icons for packaging
│   ├── icon.ico
│   ├── icon.icns
│   └── icon.png
│
├── electron.vite.config.ts
├── electron-builder.yml
├── package.json
└── tsconfig.json
```
## 12. Adding Express inside Electron

Since the app will need a small server for processing files we will need to install express or fastify or hono depending on which web server we will choose. For the moment let us consider express or fastify.

Express server:

```bash
npm install express
npm install --save-dev @types/express
```

Fastify:

```bash
npm install fastify
npm install --save-dev @types/node
```

> The reason to consider fastify is that express has not been updated for long time and the latest version of 5 has not brought significant improvement or new features. Lack of typescript support and poor async/await support may also be other reasons for not choosing it. But since the POC for Scenario Quick Preview has been created using express, it is worth it to mention it as well.

---

## 13. Why Electron-Vite + Electron-Builder?

| Benefit | Description |
|---------|-------------|
| ⚡ **Fast HMR** | Near-instant hot module replacement during development |
| 🔧 **Unified config** | Single `electron.vite.config.ts` for main, preload, and renderer |
| 📦 **Superior packaging** | Electron-builder offers NSIS, AppImage, DMG with differential updates |
| 🔄 **Auto-updates** | Seamless integration with `electron-updater` |
| 📝 **TypeScript first** | Built-in TypeScript support without extra setup |
| 🚀 **Fast builds** | Vite's esbuild pre-bundling for quick cold starts |

## 14. Integrating the initial app with shadcn and tailwindcss

(Guide)[https://blog.mohitnagaraj.in/blog/202505/Electron_Shadcn_Guide#common-gotchas--quick-fixes]


