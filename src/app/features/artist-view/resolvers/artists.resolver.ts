import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ArtistService } from '../services/artist.service';

export const artistResolver: ResolveFn<any> = (route, state) => {
  const artistService = inject(ArtistService);
  const aristId = route.paramMap.get('id')!;
  
  return artistService.fetchArtistDetails(aristId)
};

export const trendingArtistResolver: ResolveFn<any> = (route, state) => {
  const artistService = inject(ArtistService);
  
  return artistService.fetchChartArtist();
};
