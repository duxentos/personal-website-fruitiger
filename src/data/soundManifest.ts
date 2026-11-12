export const soundManifest = {
  "desktop.click": {
    "src": "/sounds/menu/menu-select.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 0
  },
  "desktop.startup": {
    "src": "/sounds/desktop/startup.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 160
  },
  "desktop.shutdown": {
    "src": "/sounds/desktop/shutdown.ogg",
    "category": "desktop",
    "enabled": false,
    "cooldownMs": 160
  },
  "desktop.icon": {
    "src": "/sounds/desktop/icon-click.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 160
  },
  "desktop.open": {
    "src": "/sounds/desktop/window-open.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 160
  },
  "desktop.close": {
    "src": "/sounds/desktop/window-close.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 160
  },
  "desktop.minimize": {
    "src": "/sounds/desktop/window-minimize.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 160
  },
  "desktop.maximize": {
    "src": "/sounds/desktop/window-maximize.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 160
  },
  "desktop.error": {
    "src": "/sounds/desktop/error.ogg",
    "category": "desktop",
    "enabled": true,
    "cooldownMs": 160
  },
  "menu.open": {
    "src": "/sounds/menu/menu-open.ogg",
    "category": "menu",
    "enabled": true,
    "cooldownMs": 160
  },
  "menu.select": {
    "src": "/sounds/menu/menu-select.ogg",
    "category": "menu",
    "enabled": true,
    "cooldownMs": 160
  },
  "menu.back": {
    "src": "/sounds/menu/menu-back.ogg",
    "category": "menu",
    "enabled": true,
    "cooldownMs": 160
  },
  "bubbles.pop": {
    "src": "/sounds/bubbles/bubble-pop.ogg",
    "category": "bubbles",
    "enabled": true,
    "cooldownMs": 100
  },
  "bubbles.bounce": {
    "src": "/sounds/bubbles/bubble-bounce.ogg",
    "category": "bubbles",
    "enabled": false,
    "cooldownMs": 160
  },
  "ipod.wheel": {
    "src": "/sounds/ipod/wheel-click.ogg",
    "category": "ipod",
    "enabled": true,
    "cooldownMs": 90
  },
  "ipod.select": {
    "src": "/sounds/ipod/select.ogg",
    "category": "ipod",
    "enabled": true,
    "cooldownMs": 160
  },
  "ipod.back": {
    "src": "/sounds/ipod/menu-back.ogg",
    "category": "ipod",
    "enabled": true,
    "cooldownMs": 160
  },
  "ipod.track": {
    "src": "/sounds/ipod/track-change.ogg",
    "category": "ipod",
    "enabled": true,
    "cooldownMs": 160
  },
  "mii.greeting": {
    "src": "/sounds/mii/greeting.ogg",
    "category": "mii",
    "enabled": true,
    "cooldownMs": 160
  },
  "mii.interaction": {
    "src": "/sounds/mii/interaction.ogg",
    "category": "mii",
    "enabled": true,
    "cooldownMs": 160
  },
  "notifications.notice": {
    "src": "/sounds/notifications/notification.ogg",
    "category": "notifications",
    "enabled": true,
    "cooldownMs": 160
  },
  "notifications.success": {
    "src": "/sounds/notifications/success.ogg",
    "category": "notifications",
    "enabled": true,
    "cooldownMs": 160
  }
} as const;
export type SoundEvent=keyof typeof soundManifest;
