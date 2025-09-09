---
title: FCM
---

## Firebase Cloud Messaging
[Reference](https://firebase.google.com/docs/cloud-messaging/js/client?hl=zh-cn&_gl=1*1xs7v5a*_up*MQ..*_ga*MzMyNzM0NTU3LjE3NTY5NTY1OTA.*_ga_CW55HF8NVT*czE3NTY5NTY1OTAkbzEkZzAkdDE3NTY5NTY1OTAkajYwJGwwJGgw)

FCM is a messaging service that allows you to send and receive messages across platforms.

## Steps
- Create a project(Admin)
- Add a app(Admin)
- Get the server key(Admin)
- Get the token(Client)
- Send a message used the token(Admin)
- Receive a message(Client)

## Web
### Service Worker

这里不需要手动注册service worker, 因为firebase会自动注册

```js
// public/firebase-messaging-sw.js
/* eslint-disable no-undef */
// ⚠️： 如果想自定义事件，必须放在脚本导入之前
self.addEventListener('notificationclick', (event) => {
  const { FCM_MSG } = event.notification.data
  const { data } = FCM_MSG
  console.log('notificationclick', event)

  event.notification.close()
  event.waitUntil(clients.openWindow(data.link + '?source=notification'))
})

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js',
)

const firebaseConfig = {
// ...
}
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig)

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-unused-vars
const messaging = firebase.messaging()

```

### 站内配置
类似 service worker中配置, 用来获取token
```ts
// utils/firebase.ts
'use client'

import { initializeApp } from 'firebase/app'
import {
  getMessaging,
  getToken,
  type GetTokenOptions,
  isSupported,
} from 'firebase/messaging'
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyACFvAu1_mSLYWwud_qeniCDGwUtv4Ri-g',
  authDomain: 'hixai-5b8b9.firebaseapp.com',
  projectId: 'hixai-5b8b9',
  storageBucket: 'hixai-5b8b9.firebasestorage.app',
  messagingSenderId: '932980486363',
  appId: '1:932980486363:web:93813654e4617ecbaa1cfe',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = () => getMessaging(app)

export const getFCMToken = async (
  params: {
    permission?: NotificationPermission
  } & Pick<GetTokenOptions, 'vapidKey'>,
) => {
  const { permission, vapidKey } = params
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    permission === 'granted'
  ) {
    if (!(await isSupported())) return

    return await getToken(messaging(), {
      vapidKey,
    })
  }
}

```

```ts
// utils/notification.ts
export async function requestPermission() {
  if (!('Notification' in window)) {
    console.warn('Current browser does not support Notification API')
    return
  }

  if (Notification.permission !== 'granted') {
    try {
      return await Notification.requestPermission()
    } catch (error) {
      console.error('requestPermission error:', error)
      return 'denied'
    }
  }

  return Notification.permission
}
```

站内通知(可选)

```js
export default function App() {

  useEffect(() => {
    const un = onMessage(messaging(), (payload) => {
      console.log('payload', payload)
    })

    return () => {
      un()
    }
  }, [])

  return {
    token,
  }
}
```