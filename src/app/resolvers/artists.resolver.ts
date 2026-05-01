import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MusicService } from '../services/music.services';


export const artistResolver: ResolveFn<any> = (route, state) => {
  const musicService = inject(MusicService);
  const aristId = route.paramMap.get('id')!;
  
  return musicService
};