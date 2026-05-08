import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlaylistStore } from '../state/playlist.store';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../playlist.model';
export const playlistResolver: ResolveFn<Playlist| null> = async (route, state) => {
 const playlistStore = inject(PlaylistStore);
    const playlistId = route.paramMap.get('id')!;

    // If store hasn't loaded yet, load it first
    if (playlistStore.playlists().length === 0) {
        await playlistStore.loadPlaylists();
    }

    return playlistStore.playlists().find(p => p.id === playlistId) ?? null;
};