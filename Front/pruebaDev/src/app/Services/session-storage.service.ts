// src/app/services/session-storage.service.ts
import { Injectable } from '@angular/core';
import { SessionStorageData } from '../Interface/iSessionStorage';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storageKey = 'appData';

  getSessionData(): SessionStorageData | null {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as SessionStorageData : null;
  }

  setSessionData(data: SessionStorageData): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  clearSessionData(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
