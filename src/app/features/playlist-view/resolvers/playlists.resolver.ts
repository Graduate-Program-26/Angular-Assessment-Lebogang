import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlaylistStore } from '../state/playlist.store';

export const playlistResolver: ResolveFn<any> = (route, state) => {
  const playlistStore =  inject(PlaylistStore)
  const playlistId = route.paramMap.get('id')!;
  

  return playlistStore.playlists().find(playlist => playlist.id === playlistId) || null;
};