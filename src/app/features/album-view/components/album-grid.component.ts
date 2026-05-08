import {Component, signal, inject, OnInit} from '@angular/core'
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
    
    albums = signal<Album[]>([]);

    async ngOnInit() {
        try {
            const data = await this.albumsService.getChartedAlbums();
  
            this.albums.set(data);
        } catch (error) {
            console.error('Failed to load albums', error);
            
        }
    }
    
}