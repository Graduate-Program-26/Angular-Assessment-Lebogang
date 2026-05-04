import {Component, signal} from '@angular/core'
import { MOCK_ARTISTS } from '../mock-data/artists.mock'
import { ArtistCard } from './artist-card.component'

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
export class ArtistGrid {
    artists = signal(MOCK_ARTISTS);
}