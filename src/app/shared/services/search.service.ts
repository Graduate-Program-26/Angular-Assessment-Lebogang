import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private http = inject(HttpClient);

    async searchAll(query: string): Promise<any[]> {
        if (!query) return [];

        try {
            const url = `api/search?q=${query}`;
            const response = await firstValueFrom(this.http.get<{ data: any[] }>(url));

            return response.data.map(item => ({
                label: item.title || item.name,
                icon: item.type === 'artist' ? 'pi-user' : 'pi-prime',
                category: item.type,
                id: item.id,
                type: item.type
            }));
        } catch (error) {
            return [];
        }
    }
}