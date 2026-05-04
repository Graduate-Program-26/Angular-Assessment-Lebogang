import { Injectable, signal } from "@angular/core";
import { Playlist } from "../playlist.model";
import { Track } from "../../track-view/track.model";
@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    playlists = signal<Playlist[]>([]);

    private openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('CrescendoDatabase', 1);

            request.onupgradeneeded = (event: any) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('playlists')) {
                    db.createObjectStore('playlists', { keyPath: 'id' });
                }
            };

            request.onsuccess = (event: any) => {
                resolve(event.target.result);
            };

            request.onerror = (event: any) => {
                reject(event.target.error);
            };
        });
    }

    async loadPlaylists() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['playlists'], 'readonly');
            const store = transaction.objectStore('playlists');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async getPlaylists() {
        return this.playlists();
    }

    async addPlaylist(title: string) {
        const newPlaylist: Playlist = {
            id: crypto.randomUUID(),
            title: title,
            tracks: [],
            duration: 0
        }

        return newPlaylist;
    }

    async addTrackToPlaylist(playlistId: string, track: Track): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['playlists'], 'readwrite');
            const store = transaction.objectStore('playlists');
            const request = store.get(playlistId);

            request.onsuccess = () => {
                const playlist: Playlist = request.result;
                if (playlist) {
                    const exists = playlist.tracks.some(t => t.id === track.id);
                    if (!exists) {
                        playlist.tracks.push(track);
                        playlist.duration = playlist.tracks.reduce((acc, curr) => acc + parseInt(String(curr.duration || '0'), 10), 0);
                        
                        const updateRequest = store.put(playlist);
                        updateRequest.onsuccess = () => resolve();
                        updateRequest.onerror = (e) => reject(e);
                    } else {
                        resolve(); // Track already exists
                    }
                } else {
                    reject(new Error('Playlist not found'));
                }
            };
            request.onerror = (e) => reject(e);
        });
    }

    async removeTrackFromPlaylist(playlistId: string, trackId: string) : Promise<void> {
        const db = await this.openDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['playlists'], 'readwrite');
            const store = transaction.objectStore('playlists');
            const request = store.delete(playlistId);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }


    async updatePlaylist(playlistId: string, updatedData: Partial<Playlist>): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['playlists'], 'readwrite');
            const store = transaction.objectStore('playlists');
            const request = store.get(playlistId);

            request.onsuccess = () => {
                const playlist = request.result;
                if (playlist) {
                    const updatedRecord = { ...playlist, ...updatedData };
                    const updateRequest = store.put(updatedRecord);
                    
                    updateRequest.onsuccess = () => resolve();
                    updateRequest.onerror = (e) => reject(e);
                } else {
                    reject(new Error('Playlist not found.'));
                }
            };
            request.onerror = (e) => reject(e);
        });
    }

    async deletePlaylist(playlistId: string): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['playlists'], 'readwrite');
            const store = transaction.objectStore('playlists');
            const request = store.delete(playlistId);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}