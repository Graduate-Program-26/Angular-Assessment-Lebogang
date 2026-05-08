import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Artist } from '../artist.model';
import { Album } from '../../album-view/album.model';
import { Track } from '../../track-view/track.model';


import { ArtistService } from '../services/artist.service';
import { AlbumnCard } from '../../album-view/components/album-card.component';
import { AlbumService } from '../../album-view/services/albums.service';
import { TrackCard } from '../../track-view/components/track-card.component';
import { TracksService } from '../../track-view/services/tracks.service';
import { ArtistViewDetails } from '../artist.model';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'artist-view',
    imports: [AlbumnCard, TrackCard, CommonModule, ButtonModule, RouterLink],
    styles: `
        :host {
            display: block;
        }
        .artist-hero {
            background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)),  center/cover;
        }
    `,
    template: `
        <div class="max-w-7xl mx-auto p-6 md:p-8 space-y-10">
            <header class="artist-hero flex flex-col md:flex-row items-center md:items-end gap-6 p-6 md:p-8 rounded-3xl shadow-xl border border-surface-border">
                <img 
                    [src]="artistState().info?.picture_big || 'https://placehold.co/150'" 
                    [alt]="artistState().info?.name" 
                    class="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-background" 
                />
                <div class="flex-1 text-center md:text-left">
                    <p class="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Artist</p>
                    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mt-1 mb-2">{{ artistState().info?.name }}</h1>
                    <div class="flex justify-center md:justify-start gap-4 text-sm text-muted-foreground mt-2 font-medium">
                        <span>{{ artistState().albums.length }} Albums</span>
                        <span>&bull;</span>
                        <span>{{ artistState().tracks.length}} Tracks</span>
                    </div>
                </div>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div class="lg:col-span-1 space-y-4">
                    <h2 class="text-2xl font-bold text-foreground flex items-center gap-2">
                        <i class="pi pi-bolt text-yellow-500"></i> Popular Tracks
                    </h2>
                    
                    <div class="flex flex-col gap-3 bg-surface-card p-4 rounded-xl border border-surface-border shadow-sm">
                        @for (track of artistState().tracks; track track.id; let i = $index) {
                            <div class="flex items-center gap-3 p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200">
                                <span class="text-sm text-muted-foreground font-semibold w-6 text-right">{{ i + 1 }}</span>
                                 <div class="flex-1" >
                                    <track-card [trackData]="track" />
                                </div>
                            </div>
                        } @empty {
                            <p class="text-muted-foreground text-sm p-4 text-center">No popular tracks found.</p>
                        }
                    </div>
                </div>

                <div class="lg:col-span-2 space-y-4">
                    <h2 class="text-2xl font-bold text-foreground flex items-center gap-2">
                        <i class="pi pi-folder text-primary"></i> Discography
                    </h2>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        @for (album of artistState().albums; track album.id) {
                            <div class="bg-surface-card p-4 rounded-xl border border-surface-border shadow-sm hover:shadow-md transition-shadow" [routerLink]="['/albums', album.id]">
                                <album-card [albumData]="album" />
                            </div>
                        } @empty {
                            <div class="col-span-full text-center py-12 text-muted-foreground bg-surface-card rounded-xl border border-surface-border">
                                <i class="pi pi-inbox text-3xl mb-3"></i>
                                <p class="text-lg">No albums available for this artist.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        `,
    standalone: true
})
export class ArtistView implements OnInit {
private route = inject(ActivatedRoute);
    private albumService = inject(AlbumService);
    private artistService = inject(ArtistService);

   
    artistState = signal<{
        info: Artist | null;
        albums: Album[];
        tracks: Track[];
        loading: boolean;
    }>({
        info: null,
        albums: [],
        tracks: [],
        loading: true
    });

    ngOnInit() {
        this.route.data.subscribe(async ({ artistData }) => {
            if (!artistData) return;

            this.artistState.update(s => ({ ...s, loading: true, info: artistData }));

            await this.loadAllContent(artistData.id);
        });
    }

    private async loadAllContent(artistId: string) {
        try {
            const [albums, tracks] = await Promise.all([
                this.albumService.getAlbumsDataFromArtist(artistId),
                this.artistService.fetchTopSongs(artistId)
            ]);

            this.artistState.set({
                info: this.artistState().info,
                albums,
                tracks,
                loading: false
            });
        } catch (error) {
            this.artistState.update(s => ({ ...s, loading: false }));
            console.error("Failed to load artist details", error);
        }
    }


}