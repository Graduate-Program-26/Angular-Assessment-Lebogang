import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MOCK_TRACKS } from "../mock-data/tracks.mock";
import { Track } from "../track.model";

@Injectable({
    providedIn: 'root'
})
export class TracksService {
    
    async getTracksForAlbum(albumId: string) {
        return MOCK_TRACKS;
    }

    async getTrack(trackId: string) : Promise<Track> {
        return MOCK_TRACKS[1];
    }
}