import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Track } from '../track.model';
import { TrackCard } from './track-card.component';
import { TracksService } from '../services/tracks.service';
import { MOCK_TRACKS } from '../mock-data/tracks.mock';

@Component({
    selector: 'track-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        SkeletonModule,
        DataViewModule,
        ConfirmDialogModule,
        TrackCard
    ],
    providers: [MessageService, ConfirmationService],
    styles: `
        .workspace-content {
            padding: 2rem;
            max-width: 900px;
            margin: 0 auto;
        }

        .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(55, 53, 47, 0.08);
            padding-bottom: 1rem;
        }

        .n-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #37352f;
            margin: 0;
        }

        .search-bar {
            margin-bottom: 1.5rem;
        }

        .notion-search-input {
            width: 100%;
            max-width: 400px;
            background: rgba(55, 53, 47, 0.04);
            border: 1px solid rgba(55, 53, 47, 0.08);
            border-radius: 6px;
            padding: 0.5rem 0.75rem;
            color: #37352f;
        }

        .track-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .track-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            background: #ffffff;
            border: 1px solid rgba(55, 53, 47, 0.08);
            transition: background 0.1s;
        }

        .track-row:hover {
            background: rgba(55, 53, 47, 0.02);
        }

        .track-actions {
            display: flex;
            gap: 0.5rem;
        }

        .skeleton-track-row {
            margin-bottom: 0.5rem;
        }

        .empty-state {
            text-align: center;
            padding: 3rem;
            color: rgba(55, 53, 47, 0.4);
        }
    `,
    template: `
        <div class="workspace-content">
            <p-toast position="top-center" />
            
            <p-confirmDialog />

            <header class="list-header">
                <div>
                    <h1 class="n-title">📋 Music Database</h1>
                    <h2>Album Database</h2>
                </div>
            </header>

            <div class="search-bar">
                <input 
                    pInputText 
                    type="text" 
                    [(ngModel)]="searchQuery" 
                    (input)="applyFilter()" 
                    placeholder="Filter tracks by title or artist..." 
                    class="notion-search-input" 
                />
            </div>

            @if (isLoading()) {
                <div class="track-list">
                    @for (item of [1, 2, 3, 4, 5]; track item) {
                        <div class="skeleton-track-row">
                            <p-skeleton width="100%" height="3rem" borderRadius="4px" />
                        </div>
                    }
                </div>
            } @else {
                <p-data-view #dv [value]="filteredTracks()">
                    <ng-template pTemplate="list" let-tracks>
                        <div class="track-list">
                            @for (track of tracks; track track.id) {
                                <div class="track-row">
                                    <track-card [trackData]="track" />
                                    <div class="track-actions">
                                        <p-button 
                                            icon="pi pi-heart" 
                                            [text]="true" 
                                            severity="secondary" 
                                            (click)="favouriteConfirm($event, track)" 
                                        />
                                        <p-button 
                                            icon="pi pi-plus" 
                                            [text]="true" 
                                            severity="secondary" 
                                            (click)="openAddToPlaylistDialog(track)" 
                                        />
                                    </div>
                                </div>
                            } @empty {
                                <div class="empty-state">
                                    <p>No tracks found matching your criteria.</p>
                                </div>
                            }
                        </div>
                    </ng-template>
                </p-data-view>
            }
        </div>

        <p-dialog header="Add to Playlist" [modal]="true" [(visible)]="addToPlaylistDialogVisible" [style]="{ width: '25rem' }">
            <p>Select a playlist to add this track to:</p>
            <div class="flex justify-end gap-2 mt-4">
                <p-button label="Cancel" severity="secondary" (click)="addToPlaylistDialogVisible = false" />
                <p-button label="Add" (click)="confirmAddToPlaylist($event)" />
            </div>
        </p-dialog>
    `
})
export class TrackList implements OnInit {
    tracksService = inject(TracksService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    tracks = signal<Track[]>(MOCK_TRACKS);
    filteredTracks = signal<Track[]>(MOCK_TRACKS);
    isLoading = signal(true);
    searchQuery = '';

    addToPlaylistDialogVisible = false;
    selectedTrackForAction: Track = null;

    ngOnInit() {
        setTimeout(() => {
            // tracks = this.tracksService.getTracksForAlbum(id) // @TODO
            this.isLoading.set(false);
        }, 1200);
    }

    applyFilter() {
        const query = this.searchQuery.toLowerCase().trim();
        if (!query) {
            this.filteredTracks.set(this.tracks());
        } else {
            const filtered = this.tracks().filter((track) => 
                track.title.toLowerCase().includes(query) || track.artist.name.toLowerCase().includes(query)
            );
            this.filteredTracks.set(filtered);
        }
    }

    openAddToPlaylistDialog(track: Track) {
        this.selectedTrackForAction = track;
        this.addToPlaylistDialogVisible = true;
    }

    saveToPlaylist() { // @TODO
        this.addToPlaylistDialogVisible = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: `${this.selectedTrackForAction?.title} added to playlist.`
        });
    }

    toggleFavorite(track: Track) { // @TODO
        this.messageService.add({
            severity: 'info',
            summary: 'Updated',
            detail: `${track.title} toggled in favorites.`
        });
    }

    favouriteConfirm(event: Event, track: Track) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Add ${track.title} to favorites?`,
            header: 'Add to Favorites',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Confirm',
                severity: 'success'
            },
            accept: () => {
                this.toggleFavorite(track);
            },
            reject: () => {
                // Action cancelled
            }
        });
    }

    confirmAddToPlaylist(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Add ${this.selectedTrackForAction?.title} to playlist?`,
            header: 'Confirm Action',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Confirm',
                severity: 'success'
            },
            accept: () => {
                this.saveToPlaylist();
            },
            reject: () => {
                // Action cancelled
            }
        });
    }
}