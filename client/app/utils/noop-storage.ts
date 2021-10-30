export class NoopStorage {
  async create() {
    return this;
  }

  async get(key: string) {
    return null;
  }

  async set(key: string, value: any) {}
  async remove(key: string): Promise<any> {}
  async clear(): Promise<void> {}

  async length(): Promise<number> {
    return 0;
  }

  async keys() {
    return [];
  }
}
