import {Component, signal} from '@angular/core'
import { MOCK_ALBUMS } from '../mock-data/album.mock';
import { AlbumnCard } from './album-card.component';
@Component({
    selector: 'album-grid',
    imports: [AlbumnCard],
    styles: `

    `,
    template: `
        <div class="flex flex-col">
            @for (album of albums(); track album.id) {
                <album-card [albumData]="album" />
            }
        </div>
    `
})
export class AlbumsGrid {
    albums = signal(MOCK_ALBUMS);
}