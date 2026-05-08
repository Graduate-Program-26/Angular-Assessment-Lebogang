import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
         try {
             const url = `api/album/${albumId}/tracks`;
                    const response = await firstValueFrom(this.http.get<any>(url));
              
                return response.data;
         } catch (error) {
            return []
         }
        
         
    }

    async getTrack(trackId: string) : Promise<Track> {
        const url = `api/track/${trackId}`
       const response = await firstValueFrom(this.http.get<any>(url));

    return response;
    }

    async searchTracks(query: string) {
        
    }
}