import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TracksService } from '../services/tracks.service';
export const trackResolver: ResolveFn<any> = (route, state) => {
  const tracksService =  inject(TracksService)
  const trackId = route.paramMap.get('id')!;
  

  return tracksService.getTrack(trackId);
};

export const tracksResolver: ResolveFn<any> = (route, state) => {
  const tracksService =  inject(TracksService)
  const albumId = route.paramMap.get('id')!;
  

  return tracksService.getTracksForAlbum(albumId);
};

export const trendingTracksResolver: ResolveFn<any> = (route, state) => {
  const tracksService =  inject(TracksService);

  return tracksService.getChartedTracks();
};
