import { Injectable, inject } from "@angular/core";
import { MOCK_ALBUMS } from "../mock-data/albums.mock";
import { HttpClient } from "@angular/common/http";
import { Album } from "../album.model";
import { firstValueFrom, forkJoin , map} from "rxjs"; // Converts an observable to a promise by subscribing to the observable, and returning a promise that will resolve as soon as the first value arrives from the observable. The subscription will then be closed.
@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    private http = inject(HttpClient);
    private readonly BASE_URL = "https://api.deezer.com";


    async getChartedAlbums() {

        try {

           const url = 'api/chart/0/albums';
            const response = await firstValueFrom(this.http.get<any>(url));
            
            return response.data;
        } catch (error) {
            return [];
        }
    }
    async getAlbumsDataFromArtist(artistId: string) {
        if (!artistId) return [];

        try {
            const url = `api/artist/${artistId}/albums`;
            const response = await firstValueFrom(this.http.get<{ data: Album[] }>(url));
            return response.data;
        } catch (error) {
            console.error('Error fetching artist albums:', error);
            return []; // Fallback to empty array or MOCK_ALBUMS if you prefer
        }
    }

    async getAlbumFromId(albumId: string) {
        if (!albumId) return [];

        try {
            const url = `api/album/${albumId}`;
            const response = await firstValueFrom(this.http.get<{ data: Album[] }>(url));
            return response;
        } catch (error) {
            return []
        }

    }

    getAlbumWithEnrichedTracks(albumId: string) {
    const albumDetails$ = this.http.get<any>(`api/album/${albumId}`);
    const trackList$ = this.http.get<any>(`api/album/${albumId}/tracks`);

    return forkJoin({
        album: albumDetails$,
        tracks: trackList$
    }).pipe(
        map(result => {
            const cover = result.album.cover_medium;
            
            const enrichedTracks = result.tracks.data.map((t: any) => ({
                ...t,
                album: { cover_medium: cover }
            }));
            
            return { ...result.album, tracks: enrichedTracks };
        })
    );
}

    async searchAlbums(query: string) {

    }
}