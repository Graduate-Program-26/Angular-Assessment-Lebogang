import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private http = inject(HttpClient);

 async searchAll(query: string): Promise<any[]> {
        if (!query.trim()) return [];

        try {
            const [artists, albums, tracks] = await Promise.all([
                this.fetchCategory(query, 'artist'),
                this.fetchCategory(query, 'album'),
                this.fetchCategory(query, 'track')
            ]);


            return [...artists, ...albums, ...tracks];
        } catch (error) {
            console.error('Search failed', error);
            return [];
        }
    }

    private async fetchCategory(query: string, type: 'artist' | 'album' | 'track'): Promise<any[]> {
        const url = `api/search/${type}?q=${encodeURIComponent(query)}`;
        const res = await firstValueFrom(this.http.get<{ data: any[] }>(url));
        
        return res.data.map(item => ({
            label: item.title || item.name,
       
            icon: this.getIcon(type),
            category: type.toUpperCase(),
            id: item.id,
            type: type,
   
            image: item.picture_small || item.cover_small || (item.album ? item.album.cover_small : null)
        }));
    }

    private getIcon(type: string): string {
        switch (type) {
            case 'artist': return 'pi-user';
            case 'album': return 'pi-database';
            case 'track': return 'pi-microphone'; 
            default: return 'pi-search';
        }
    }
}