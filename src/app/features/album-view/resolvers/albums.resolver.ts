import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AlbumService } from '../services/albums.service';


export const albumResolver: ResolveFn<any> = (route, state) => {
  const albumService = inject(AlbumService);
  const albumId = route.paramMap.get('id')!;
  
  return albumService.getAlbumFromId(albumId)
};

export const albumsResolver: ResolveFn<any> = (route, state) => {
  const albumService = inject(AlbumService);
  const artistId = route.paramMap.get('id')!;
  
  return albumService.getAlbumsDataFromArtist(artistId);
};