import { Injectable } from "@angular/core";
import { MOCK_ALBUMS } from "../mock-data/albums.mock";

@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    async getAlbumsDataFromArtist(id: string) {

        return MOCK_ALBUMS;
    }

    async getAlbumFromId(id: string) {
        return MOCK_ALBUMS[0];
    }
}