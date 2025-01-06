import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create()
    this._storage = storage
  }

  async get(key: string) {
    return this._storage?.get(key)
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value)
  }
  
  async clear(key: string) {
    return await this._storage?.clear();
  }

  // Functions for array manipulation
  async add(key: string, value: any) {
    if(! await this.contains(key, value)) {
      var content: Array<any> = await this._storage?.get(key);
      if(content !== null) {
        content.push(value);
        await this._storage?.set(key, content);
        return content;
      } else {
        this._storage?.set(key, [value]);
        return [value];
      }
    }
    return null;
  }

  async remove(key: string, value: any) {
    if(await this.contains(key, value)) {
      var content: Array<any> = await this._storage?.get(key);
      content.forEach( (item, index) => {
        if(JSON.stringify(item) == JSON.stringify(value)) { content.splice(index, 1); }
      });
      await this._storage?.set(key, content);
      return content;
    }
    return null;
  }
    
  async contains(key: string, value: any) {
    if (await this._storage?.get(key) instanceof Array) {
      const content: Array<any> = await this._storage?.get(key);
      for (var i of content.values()) {
        if (JSON.stringify(i) == JSON.stringify(value)) {
          return true;
        }
      }
    } else {
      this._storage?.set(key, new Array<any>());
    }
    return false;
  }
  // ---
  
}
