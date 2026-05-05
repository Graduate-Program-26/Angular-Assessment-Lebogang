import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TracksService } from '../services/tracks.service';
export const trackResolver: ResolveFn<any> = (route, state) => {
  const tracksService =  inject(TracksService)
  const trackId = route.paramMap.get('id')!;
  

  return tracksService.getTrack(trackId);
};