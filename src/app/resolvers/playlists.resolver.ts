import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MusicService } from '../services/music.services';


export const playlistResolver: ResolveFn<any> = (route, state) => {
  const musicService = inject(MusicService);
  const playlistId = route.paramMap.get('id')!;
  
  return musicService
};