import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Album, EnrichedAlbum } from "../album.model";
import { Track } from "../../track-view/track.model";
import { Observable } from "rxjs";
import { firstValueFrom, forkJoin, map } from "rxjs"; // Converts an observable to a promise by subscribing to the observable, and returning a promise that will resolve as soon as the first value arrives from the observable. The subscription will then be closed.
@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    private http = inject(HttpClient);
    private readonly BASE_URL = "https://api.deezer.com";


    async getChartedAlbums() {

        try {

            const url = 'api/chart/0/albums';
            const response = await firstValueFrom(this.http.get<{ data: Album[] }>(url));

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
            return response.data || [];
        } catch (error) {
            console.error('Error fetching artist albums:', error);
            return [];
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

    getAlbumWithEnrichedTracks(albumId: string): Observable<EnrichedAlbum> {
        // Explicitly type the HTTP responses
        const albumDetails$ = this.http.get<Album>(`api/album/${albumId}`);
        const trackList$ = this.http.get<{ data: Track[] }>(`api/album/${albumId}/tracks`);

        return forkJoin({
            album: albumDetails$,
            tracks: trackList$
        }).pipe(
            map(({ album, tracks }): EnrichedAlbum => {
                // 2. Extract the cover to map it onto tracks that lack it
                const cover = album.cover_medium;
                const coverXl = album.cover; // Using 'cover' as the xl fallback if needed

                // 3. Map the tracks to ensure they contain the parent's album info
                const enrichedTracks: Track[] = tracks.data.map((t: Track) => ({
                    ...t,
                    album: {
                        id: album.id,
                        title: album.title,
                        cover_medium: cover,
                        cover_xl: coverXl
                    }
                }));

                // 4. Return the complete EnrichedAlbum object
                return {
                    ...album,
                    tracks: enrichedTracks
                };
            })
        );
    }
    async searchAlbums(query: string) {

    }
}