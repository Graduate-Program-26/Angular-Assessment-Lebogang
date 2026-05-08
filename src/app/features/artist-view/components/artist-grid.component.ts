import {Component, signal, inject, OnInit} from '@angular/core'
import { ArtistService } from '../services/artist.service';
import { ArtistCard } from './artist-card.component'
import { Artist } from '../artist.model';
@Component({
    selector: 'artist-grid',
    imports: [ArtistCard],
    styles: ``,
    template: `
        <div class="flex flex-col">
            @for (artist of artists(); track artist.id) {
                <artist-card [artistData]="artist" />
            }
        </div>
    `
})
export class ArtistGrid  implements OnInit{
    artistService =  inject(ArtistService);

    artists = signal<Artist[]>([]);

    async ngOnInit() {
       try {
            const data = await this.artistService.fetchChartArtist();
            data ? this.artists.set(data): this.artists.set([])
        } catch (error) {
            console.error('Failed to load albums', error);
            // Optionally set back to empty or show a toast
        }
    }
}