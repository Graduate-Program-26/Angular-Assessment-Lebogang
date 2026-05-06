import { Injectable } from "@angular/core";
import { AlbumService } from "../../album-view/services/albums.service";
import { TracksService } from "../../track-view/services/tracks.service";
import { ArtistViewDetails } from "../artist.model";
@Injectable({
    providedIn: 'root'
})
export class ArtistService {

    async fetchArtistDetails(id: string) {

    }

    async fetchArtists() {

    }

    async searchArtists(query: string) {

    }

    async fetchArtistTracksAndAlbums(id: string)  {
        return null
    }
}