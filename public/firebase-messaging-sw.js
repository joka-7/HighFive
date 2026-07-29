// Background push handler for High5's daily missions reminder. Firebase Cloud
// Messaging requires this exact filename served from the origin root.
//
// The Firebase Web config isn't a secret, but it can differ per deployment
// (each maintainer may point this app at their own Firebase project via env
// vars). This file is served as-is — Vite never processes public/ — so it
// can't read import.meta.env; the app passes its live config in the
// registration URL's query string instead (see registerServiceWorker() in
// src/services/push.ts), and this SW reads it back from self.location.

importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js");

const params = new URL(self.location.href).searchParams;
firebase.initializeApp({
  apiKey: params.get("apiKey"),
  authDomain: params.get("authDomain"),
  projectId: params.get("projectId"),
  storageBucket: params.get("storageBucket"),
  messagingSenderId: params.get("messagingSenderId"),
  appId: params.get("appId"),
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification ?? {};
  self.registration.showNotification(title ?? "High5", {
    body: body ?? "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/"));
});
