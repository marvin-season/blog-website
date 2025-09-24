---
title: Service Worker
---

## What
Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available). They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests, and take appropriate action based on whether the network is available, and update assets residing on the server. They will also allow access to push notifications and background sync APIs.


## 实现浏览器后台推送

### SW 脚本 
此脚本放置在站点根目录: `/public/sw.js`
```js
self.addEventListener('push', function (event) {
  const notification = event.data.text()
  event.waitUntil(self.registration.showNotification(notification))
})


self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', event => {
  const data = event.data

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/vite.svg',
      data: { url: data.url }
    })
  )
})

// 点击通知时打开对应的页面
self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        const clientUrl = new URL(client.url)
        const notificationUrl = new URL(event.notification.data.url)

        if (clientUrl.origin === notificationUrl.origin && 'focus' in client) {
          return client.focus()
        }
      }
      return clients.openWindow(event.notification.data.url)
    })
  )
})
```


### 工具函数 
```ts
export interface IMessage {
  title: string
  body: string
  url: string
}

export async function requestPermission() {
  if (!('Notification' in window)) {
    console.warn('Current browser does not support Notification API')
    return
  }

  if (Notification.permission === 'granted') {
    return 'granted'
  }

  if (Notification.permission === 'denied') {
    return 'denied'
  }

  try {
    return await Notification.requestPermission()
  } catch (error) {
    console.error('requestPermission error:', error)
    return 'denied'
  }
}

export async function registerServiceWorker(url: string) {
  await navigator.serviceWorker.register(url)
}

export async function postMessage(message: IMessage) {
  await navigator.serviceWorker.ready;
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message)
  } else {
    // 等待 SW 接管
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      navigator.serviceWorker.controller?.postMessage(message)
    }, { once: true })
  }

}

export async function notification(message: IMessage) {
  const permission = await requestPermission()
  if (permission === 'granted') {
    postMessage(message)
  }
}
```

### 在React中使用
```tsx
import { registerServiceWorker, notification } from './notification';

const message = {
  title: "新提醒",
  body: "这是定时器推送的消息 " + new Date().toLocaleTimeString(),
  url: window.location.origin
}

registerServiceWorker('sw.js');

function App() {

  return (
    <button onClick={() => notification(message)}>
      <div>
        <h1>新提醒</h1>
        <p>这是定时器推送的消息 {new Date().toLocaleTimeString()}</p>
      </div>
    </button>
  )
}
export default App
```