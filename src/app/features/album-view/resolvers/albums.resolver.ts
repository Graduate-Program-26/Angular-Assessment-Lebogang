import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AlbumService } from '../services/albums.service';
import { Album } from '../album.model';
import { EnrichedAlbum } from '../album.model';
export const albumResolver: ResolveFn<EnrichedAlbum> = (route, state) => {
  const albumService = inject(AlbumService);
  const albumId = route.paramMap.get('id')!;
 
  return albumService.getAlbumWithEnrichedTracks(albumId)
};

export const albumsResolver: ResolveFn<Album[]> = (route, state) => {
  const albumService = inject(AlbumService);
  const artistId = route.paramMap.get('id')!;
  
  return albumService.getAlbumsDataFromArtist(artistId);
};

export const tredingAlbumResolver:  ResolveFn<Album[]> = (route, state) => {
 const albumService = inject(AlbumService);

  return albumService.getChartedAlbums()

}
