import { Injectable, inject } from "@angular/core";
import { AlbumService } from "../../album-view/services/albums.service";
import { TracksService } from "../../track-view/services/tracks.service";
import { ArtistViewDetails } from "../artist.model";

import { HttpClient } from "@angular/common/http";
import { Artist } from "../artist.model";
import { firstValueFrom } from "rxjs"; // Converts an observable to a promise by subscribing to the observable, and returning a promise that will resolve as soon as the first value arrives from the observable. The subscription will then be closed.

@Injectable({
    providedIn: 'root'
})
export class ArtistService {
    private http = inject(HttpClient);

    async fetchChartArtist() {
        try {
            const url = 'api/chart/0/artists';
            const response = await firstValueFrom(this.http.get<any>(url));
            
            return response.data;
        } catch (error) {

        }
    }

    async fetchArtistDetails(id: string) {

    }

    async fetchArtists() {

    }

    async searchArtists(query: string) {

    }

    async fetchArtistTracksAndAlbums(id: string) {
        return null
    }
}