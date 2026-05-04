import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlaylistStore } from '../state/playlist.store';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../playlist.model';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TrackCard } from '../../track-view/components/track-card.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'playlist-view',
    imports: [CommonModule,ReactiveFormsModule, TrackCard, SkeletonModule, DialogModule, ButtonModule, ConfirmDialogModule, ToastModule],
    providers: [MessageService, ConfirmationService],
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

                <div class="actions">
                    <button class="notion-btn" (click)="openAddTrackDialog()">
                        <i class="pi pi-plus"></i> Add Track
                    </button>
                    
                    <button class="notion-icon-btn" (click)="toggleMenu($event)">
                        <i class="pi pi-ellipsis-h"></i>
                    </button>
                    
                    @if (menuVisible) {
                        <div class="notion-dropdown">
                            <button class="dropdown-item" (click)="openRenameDialog()">
                                <i class="pi pi-pencil"></i> Rename
                            </button>
                            <button class="dropdown-item delete-action" (click)="deletePlaylist()">
                                <i class="pi pi-trash"></i> Delete Playlist
                            </button>
                        </div>
                    }
                </div>
                </header>

                <div class="track-list">
                    @for (track of playlist.tracks; track track.id) {
                        <track-card [trackData]="track" /> 
                        <button class="track-remove-btn" (click)="removeTrack(track.id)">
                            <i class="pi pi-times"></i>
                        </button>
                    }
                </div>
            } @else {
               <header class="page-title-block">
                    <p-skeleton width="40%" height="2.5rem" class="mb-2" />
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

             <p-dialog header="Add Tracks" [modal]="true" [(visible)]="addTrackDialogVisible" [style]="{ width: '25rem' }">

                <div class="flex justify-end gap-2">
                    <p-button label="Cancel" severity="secondary" (click)="addTrackDialogVisible = false" />
                    <p-button label="Save" (click)="addTracks()" />
                </div>
            </p-dialog>

            <p-dialog header="Rename Playlist" [modal]="true" [(visible)]="renamePlaylistDialogVisible" [style]="{ width: '25rem' }">

                <div class="flex justify-end gap-2">
                    <p-button label="Cancel" severity="secondary" (click)="renamePlaylistDialogVisible = false" />
                    <p-button label="Save" (click)="renamePlaylist()" />
                </div>
            </p-dialog>
        </div>
    `,
    standalone: true
})
export class PlaylistView implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    playlistStore = inject(PlaylistStore);
    playlistService = inject(PlaylistService);
    menuVisible = false;

    addTrackDialogVisible = true;
    renamePlaylistDialogVisible = true;
    
    renameControl = new FormControl('');
    // Holds the resolved playlist object
    playlist: Playlist | null = null;

    ngOnInit() {
        // Fetch the resolved data from the router state
        this.route.data.subscribe(({ playlistData }) => {
            this.playlist = playlistData;
        });
    }

    openAddTrackDialog() {
        this.addTrackDialogVisible = true;
    }

    openRenameDialog() {
        this.renamePlaylistDialogVisible = true;
    }

    async removeTrack(trackId: string) {
        if (!this.playlist) return;
        
        try {
            await this.playlistStore.removeTrackFromPlaylist(this.playlist.id, trackId);
            this.playlist.tracks = this.playlist.tracks.filter(t => t.id !== trackId); // UI update
            this.messageService.add({ severity: 'success', summary: 'Track Removed' });
        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Error removing track' });
        }
    }

    addTracks() {
        // @TODO
        this.addTrackDialogVisible = false;
    }

    async deletePlaylist() {
        if (!this.playlist) return;

        try {
            await this.playlistStore.deletePlaylist(this.playlist.id);
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Playlist was deleted' });
            
            // Redirect back to main dashboard
            this.router.navigate(['/']); 
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete' });
        }
    }

    async renamePlaylist() {
        if (!this.playlist || this.renameControl.invalid) return;

        const newTitle = this.renameControl.value!;
        try {
            await this.playlistStore.renamePlaylist(this.playlist.id, newTitle);
            this.playlist.title = newTitle; // Update UI state locally
            this.renamePlaylistDialogVisible = false;
            this.messageService.add({ severity: 'success', summary: 'Renamed', detail: 'Playlist title updated' });
        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update' });
        }
    }

    toggleMenu(event: MouseEvent) {
        event.stopPropagation();
        this.menuVisible = !this.menuVisible;
    }

  

    deleteConfirm(event: Event) {
        this.menuVisible = false;
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this playlist?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
        
            accept: () => {
                this.deletePlaylist();
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected'});
            }
        });
    }
}