import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AlbumService } from '../services/albums.service';
import { tap } from 'rxjs';


export const albumResolver: ResolveFn<any> = (route, state) => {
  const albumService = inject(AlbumService);
  const albumId = route.paramMap.get('id')!;
 
  return albumService.getAlbumWithEnrichedTracks(albumId)
};

export const albumsResolver: ResolveFn<any> = (route, state) => {
  const albumService = inject(AlbumService);
  const artistId = route.paramMap.get('id')!;
  
  return albumService.getAlbumsDataFromArtist(artistId);
};

export const tredingAlbumResolver:  ResolveFn<any> = (route, state) => {
 const albumService = inject(AlbumService);

  return albumService.getChartedAlbums()

}
