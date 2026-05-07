import {Component, signal, inject, OnInit} from '@angular/core'
import { MOCK_ALBUMS } from '../mock-data/albums.mock';
import { AlbumnCard } from './album-card.component';
import { AlbumService } from '../services/albums.service';
import { Album } from '../album.model';
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
export class AlbumsGrid implements OnInit {
   private albumsService = inject(AlbumService);
    
    // Initialize with an empty array or your MOCK_ALBUMS
    albums = signal<Album[]>(MOCK_ALBUMS);

    async ngOnInit() {
        try {
            const data = await this.albumsService.getChartedAlbums();
  
            this.albums.set(data);
        } catch (error) {
            console.error('Failed to load albums', error);
            // Optionally set back to empty or show a toast
        }
    }
    
}