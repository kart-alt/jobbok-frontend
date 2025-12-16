// Notification event emitter for global notifications
class NotificationManager {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(message, type = 'info', duration = 3000) {
    const id = Date.now();
    this.listeners.forEach(listener => {
      listener({ id, message, type, duration });
    });
    return id;
  }

  success(message, duration = 3000) {
    return this.notify(message, 'success', duration);
  }

  error(message, duration = 4000) {
    return this.notify(message, 'error', duration);
  }

  info(message, duration = 3000) {
    return this.notify(message, 'info', duration);
  }

  warning(message, duration = 3500) {
    return this.notify(message, 'warning', duration);
  }
}

export const notificationManager = new NotificationManager();
