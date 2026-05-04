import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistStore } from '../state/playlist.store';
import { Playlist } from '../playlist.model';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TrackCard } from '../../track-view/components/track-card.component';
@Component({
    selector: 'playlist-view',
    imports: [CommonModule, TrackCard, SkeletonModule],
    styles: `
    .workspace-content { padding: 2rem; }
        .track-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 0.75rem 1rem; 
            border-bottom: 1px solid rgba(55, 53, 47, 0.08); 
        }
        .text-secondary { color: rgba(55, 53, 47, 0.6); }
    `,
    template: `
        <div class="workspace-content">
            @if (playlist) {
                <header class="page-title-block">
                    <h1>{{ playlist.title }}</h1>
                    <p class="subtitle">Database containing {{ playlist.tracks.length || 0 }} tracks.</p>
                </header>

                <div class="track-list">
                    @for (track of playlist.tracks; track track.id) {
                       <track-card [trackData]="track" /> 
                    }
                </div>
            } @else {
               <header class="page-title-block">
                    <p-skeleton width="40%" height="2.5rem" styleClass="mb-2" />
                    <p-skeleton width="60%" height="1rem" />
                </header>

                <div class="track-list">
                    @for (item of [1, 2, 3, 4, 5]; track item) {
                        <div class="skeleton-track-row">
                            <p-skeleton width="100%" height="2.5rem" borderRadius="4px" />
                        </div>
                    }
                </div>
            }
        </div>
    `,
    standalone: true
})
export class PlaylistView implements OnInit {
    private route = inject(ActivatedRoute);
    playlistStore = inject(PlaylistStore);
    
    // Holds the resolved playlist object
    playlist: Playlist | null = null;

    ngOnInit() {
        // Fetch the resolved data from the router state
        this.route.data.subscribe(({ playlistData }) => {
            this.playlist = playlistData;
        });
    }
}