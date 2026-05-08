import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlaylistStore } from '../state/playlist.store';
import { Playlist } from '../playlist.model';
export const playlistResolver: ResolveFn<Playlist| null> = (route, state) => {
  const playlistStore =  inject(PlaylistStore)
  const playlistId = route.paramMap.get('id')!;
  

  return playlistStore.playlists().find(playlist => playlist.id === playlistId) || null;
};