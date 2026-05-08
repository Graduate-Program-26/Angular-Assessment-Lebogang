import { Component, inject, OnInit, signal, computed } from '@angular/core';
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
    imports: [CommonModule, ReactiveFormsModule, TrackCard, SkeletonModule, DialogModule, ButtonModule, ConfirmDialogModule, ToastModule],
    providers: [MessageService, ConfirmationService],
    styles: `
            .workspace-content { padding: 2rem; }
                .track-row { 
                    display: flex; 
                    justify-content: space-between; 
                    padding: 0.75rem 1rem; 
                    border-bottom: 1px solid rgba(55, 53, 47, 0.08); 
                }
                .text-secondary { color: grey; }

                .workspace-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 3rem 2rem;
            animation: fadeIn 0.3s ease-out;
        }


        .page-title-block {
            margin-bottom: 2rem;
            position: relative;
        }

        .page-title-block h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            color: white
        }

        .subtitle {
            color:white;
            font-size: 0.9rem;
        }

   
        .actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            border-bottom: 1px solid rgba(55, 53, 47, 0.08);
            padding-bottom: 1rem;
        }

        .notion-btn {
            background: transparent;
            border: none;
            color: green;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background 0.2s;
        }

        .notion-btn:hover { background: rgba(55, 53, 47, 0.08); }


        .track-list {
            display: flex;
            flex-direction: column;
        }

        .track-row-wrapper {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            transition: background 0.2s;
        }

        .track-row-wrapper:hover {
            background: rgba(55, 53, 47, 0.03);
        }

        .track-remove-btn {
            opacity: 0;
            background: transparent;
            border: none;
            color: rgba(55, 53, 47, 0.4);
            cursor: pointer;
            padding: 8px;
            transition: opacity 0.2s, color 0.2s;
        }

        .track-row-wrapper:hover .track-remove-btn {
            opacity: 1;
        }

        .track-remove-btn:hover { color: #eb5757; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `
    ,
    template: `
     <div class="workspace-content">
    @if (playlist()) {
        <header class="page-title-block">
            <h1>{{ playlist()?.title }}</h1>
            <p class="subtitle">Database containing {{ playlist()?.tracks?.length || 0 }} tracks.</p>

            <div class="actions">
                <button class="notion-btn" (click)="openAddTrackDialog()">
                    <i class="pi pi-plus"></i> Add Track
                </button>
                
                <button class="notion-btn" (click)="openRenameDialog()">
                    <i class="pi pi-pencil"></i> Rename
                </button>
                
                <button class="notion-btn text-danger" (click)="deletePlaylist()" style="color: #eb5757">
                    <i class="pi pi-trash"></i> Delete
                </button>
            </div>
        </header>

        <div class="track-list">
            @for (track of playlist()?.tracks; track track.id) {
                <div class="track-row-wrapper">
                    <track-card [trackData]="track" /> 
                    <button class="track-remove-btn" (click)="removeTrack(track.id)" title="Remove from playlist">
                        <i class="pi pi-times"></i>
                    </button>
                </div>
            } @empty {
                <div class="empty-state text-secondary p-5 text-center">
                    <i class="pi pi-folder-open block mb-2" style="font-size: 2rem; color: white;"></i>
                    <p>No tracks in this playlist yet.</p>
                </div>
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

    addTrackDialogVisible = false;
    renamePlaylistDialogVisible = false;

    renameControl = new FormControl('');
    playlistId = signal<string | null>(null);

    playlist = computed(() =>
        this.playlistStore.playlists().find(p => p.id === this.playlistId()) ?? null
    );

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.playlistId.set(params.get('id'));
        });
    }

    openAddTrackDialog() {
        this.addTrackDialogVisible = true;
    }

    openRenameDialog() {
        this.renamePlaylistDialogVisible = true;
    }

    async removeTrack(trackId: string) {
        if (!this.playlist()) return;

        try {
            await this.playlistStore.removeTrackFromPlaylist(this.playlist()!.id, trackId);
            // no manual UI update needed — computed signal reacts to store change
            this.messageService.add({ severity: 'success', summary: 'Track Removed' });
        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Error removing track' });
        }
    }

    async deletePlaylist() {
        if (!this.playlist()) return;

        try {
            await this.playlistStore.deletePlaylist(this.playlist()!.id);
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Playlist was deleted' });
            this.router.navigate(['/']);
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete' });
        }
    }

    async renamePlaylist() {
        if (!this.playlist() || this.renameControl.invalid) return;

        const newTitle = this.renameControl.value!;
        try {
            await this.playlistStore.renamePlaylist(this.playlist()!.id, newTitle);
            this.renamePlaylistDialogVisible = false;
            this.messageService.add({ severity: 'success', summary: 'Renamed', detail: 'Playlist title updated' });
        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update' });
        }
    }

    addTracks() {
        // @TODO
        this.addTrackDialogVisible = false;
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
                this.messageService.add({ severity: 'error', summary: 'Rejected' });
            }
        });
    }
}