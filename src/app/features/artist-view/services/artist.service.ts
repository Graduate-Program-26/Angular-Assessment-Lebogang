import { Injectable, inject } from "@angular/core";
import { AlbumService } from "../../album-view/services/albums.service";
import { TracksService } from "../../track-view/services/tracks.service";
import { ArtistViewDetails } from "../artist.model";

import { HttpClient } from "@angular/common/http";
import { Artist } from "../artist.model";
import { firstValueFrom } from "rxjs"; // Converts an observable to a promise by subscribing to the observable, and returning a promise that will resolve as soon as the first value arrives from the observable. The subscription will then be closed.
import { Track } from "../../track-view/track.model";
@Injectable({
    providedIn: 'root'
})
export class ArtistService {
    private http = inject(HttpClient);

    async fetchChartArtist() {
        try {
            const url = 'api/chart/0/artists';
            const response = await firstValueFrom(this.http.get<{ data: Artist[] }>(url));

            return response.data;
        } catch (error) {
            return null;
        }
    }

    async fetchArtistDetails(artistId: string) {
        try {
            const url = `api/artist/${artistId}`;
            const response = await firstValueFrom(this.http.get<Artist>(url));

            return response;
        } catch (error) {
            return null;
        }
    }

    async fetchArtists() {

    }

    async fetchTopSongs(artistId: string) {
        try {
            const url = `api/artist/${artistId}/top`;
            const response = await firstValueFrom(this.http.get<{ data: Track[] }>(url));

            return response.data;
        } catch (error) {
            return [];
        }
    }
    async searchArtists(query: string) {

    }

    async fetchArtistTracksAndAlbums(id: string) {
        return null
    }
}