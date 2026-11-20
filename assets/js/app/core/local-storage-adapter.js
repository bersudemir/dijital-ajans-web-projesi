import { AppConfig } from './app-config.js';

export class LocalStorageAdapter {
  constructor(prefix = AppConfig.storagePrefix) {
    this.prefix = prefix;
  }

  #key(name) {
    return `${this.prefix}:${name}`;
  }

  get(name, fallback = null) {
    const raw = localStorage.getItem(this.#key(name));
    if (raw === null) return fallback;

    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  set(name, value) {
    localStorage.setItem(this.#key(name), JSON.stringify(value));
  }

  has(name) {
    return localStorage.getItem(this.#key(name)) !== null;
  }
}
