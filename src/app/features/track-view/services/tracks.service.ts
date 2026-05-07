import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MOCK_TRACKS } from "../mock-data/tracks.mock";
import { Track } from "../track.model";
import { firstValueFrom } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class TracksService {
    private http = inject(HttpClient)
     async getChartedTracks() {
    
            try {
    
               const url = 'api/chart/0/tracks';
                const response = await firstValueFrom(this.http.get<any>(url));
                
                return response.data;
            } catch (error) {
                return [];
            }
        }
    async getTracksForAlbum(albumId: string) {
        return MOCK_TRACKS;
    }

    async getTrack(trackId: string) : Promise<Track> {
        return MOCK_TRACKS[1];
    }

    async searchTracks(query: string) {
        
    }
}