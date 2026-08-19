type Listener = (...args: unknown[]) => void;

export class EventEmitter<T extends { [K in keyof T]: unknown[] }> {
  private listeners = new Map<keyof T, Set<Listener>>();

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(listener as Listener);
    return this;
  }

  once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this {
    const wrapped = ((...args: T[K]) => {
      this.off(event, wrapped);
      listener(...args);
    }) as (...args: T[K]) => void;
    return this.on(event, wrapped);
  }

  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this {
    this.listeners.get(event)?.delete(listener as Listener);
    return this;
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): boolean {
    const set = this.listeners.get(event);
    if (!set || set.size === 0) {
      return false;
    }
    for (const listener of Array.from(set)) {
      listener(...args);
    }
    return true;
  }
}
