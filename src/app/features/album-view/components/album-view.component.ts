import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Album } from '../album.model';
import { TrackCard } from '../../track-view/components/track-card.component';
import { AlbumService } from '../services/albums.service';
import { TracksService } from '../../track-view/services/tracks.service';
import { Track } from '../../track-view/track.model';
import { MOCK_ALBUMS } from '../mock-data/albums.mock';
@Component({
    selector: 'album-view',
    standalone: true,
    imports: [CommonModule, TrackCard],
    styles: `
        .album-header {
            display: flex;
            gap: 2rem;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .album-cover {
            width: 12rem;
            height: 12rem;
            object-fit: cover;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
    `,
    template: `
        <div class="p-6">  
            <header class="album-header">
                <img [src]="album?.cover || 'assets/placeholder.png'" [alt]="album?.title" class="album-cover" />
                <div>
                    <span class="text-sm font-medium uppercase text-gray-500">Album</span>
                    <h1 class="text-4xl font-bold my-1">{{ album?.title }}</h1>
                    <p class="text-lg text-gray-600">{{ album?.artist?.name }}</p>
                </div>
            </header>

            <div>
                <h2 class="text-2xl font-bold mb-4">Tracks</h2>
                <div class="flex flex-col gap-3">
                    @for (track of albumTracks; track track.id; let i =$index) {
                        <div class="flex items-center gap-4 p-2  rounded-md surface-card">
                            <span class="text-muted-foreground font-semibold w-8 text-right">
                                {{ i + 1 }}
                            </span>
                            
                            <div class="flex-1">
                                <track-card [trackData]="track" />
                            </div>
                        </div>
                    } 
               
                </div>
            </div>
        </div>
    `
})
export class AlbumnView implements OnInit {
    private route = inject(ActivatedRoute);
    albumService = inject(AlbumService);
    tracksService = inject(TracksService);

    album: Album | null = null;
    albumTracks: Track[] = [];

    ngOnInit() {
        this.route.data.subscribe(async ({ albumData }) => {
            if (albumData) {
                this.album = albumData;
                this.albumTracks = albumData.tracks;
                
            }
        });
    }
}