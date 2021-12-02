import { fromByteArray, toByteArray } from 'base64-js';

export class Crypt {
  private algorithm = 'AES-GCM';
  private ivLength = 96;
  private tagLength = 128;
  private saltLength = 64;
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();
  private bufferSecret = this.encoder.encode(this.secret);

  constructor(private secret: string) {}

  async getKey(salt: BufferSource): Promise<CryptoKey> {
    const importOptions = { name: 'PBKDF2', iterations: 100000, hash: 'SHA-256', salt };
    const key = await crypto.subtle.importKey('raw', this.bufferSecret, importOptions, false, ['deriveKey']);
    return crypto.subtle.deriveKey(importOptions, key, { ...importOptions, name: this.algorithm, length: 128 }, false, [
      'encrypt',
      'decrypt',
    ]);
  }

  async encrypt(value: string): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
    const salt = crypto.getRandomValues(new Uint8Array(this.saltLength));
    const key = await this.getKey(salt);
    const options: AesGcmParams = { name: this.algorithm, iv, tagLength: this.tagLength };
    const data = this.encoder.encode(value);
    const encrypted = await crypto.subtle.encrypt(options, key, data);
    const encryptedArray = new Uint8Array(encrypted);
    const merge = new Uint8Array(salt.byteLength + iv.byteLength + encryptedArray.byteLength);
    merge.set(salt);
    merge.set(iv, salt.byteLength);
    merge.set(encryptedArray, salt.byteLength + iv.byteLength);
    return fromByteArray(merge);
  }

  async decrypt(value: string): Promise<string> {
    const bufferValue = toByteArray(value);
    const salt = bufferValue.slice(0, this.saltLength);
    const iv = bufferValue.slice(this.saltLength, salt.byteLength + this.ivLength);
    const encrypted = bufferValue.slice(salt.byteLength + iv.byteLength);
    const key = await this.getKey(salt);
    const options: AesGcmParams = { name: this.algorithm, iv, tagLength: this.tagLength };
    const decrypted = await crypto.subtle.decrypt(options, key, encrypted);
    return this.decoder.decode(decrypted);
  }
}
