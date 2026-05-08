import {Component, signal, inject, OnInit} from '@angular/core'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { DataViewModule, DataView } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PlaylistCard } from './playlist-card.component';

import { PlaylistStore } from '../state/playlist.store';
import { PlaylistService } from '../services/playlist.service';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'playlist-list',
    providers: [MessageService],
    imports: [DialogModule, FormsModule,ButtonModule, ToastModule ,InputTextModule, MultiSelectModule, PlaylistCard, SkeletonModule, DataView, DataViewModule],
    styles: `
        .skeleton-grid, .playlist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        .skeleton-card {
            background: #ffffff;
            border: 1px solid rgba(55, 53, 47, 0.08);
            border-radius: 6px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            box-shadow: 0 1px 3px rgba(55, 53, 47, 0.04);
        }

        .p-skeleton {
            background: rgba(55, 53, 47, 0.06);
        }

        .p-skeleton::after {
            background: linear-gradient(
                90deg, 
                rgba(55, 53, 47, 0) 0%, 
                rgba(55, 53, 47, 0.08) 50%, 
                rgba(55, 53, 47, 0) 100%
            );
        }

    `,
    template: `
        <div class="workspace-content p-2">
            <p-toast position="bottom-left" />
            <header class="list-header">
                <h1 class="n-title">Playlist Database</h1>
                <p-button (click)="showCreateDialog()" label="Create Playlist" />
            </header>

            @if(playlistStore.isLoading()) {
                <div class="grid skeleton-grid">
                @for (item of [1, 2, 3, 4]; track item) {
                    <div class="skeleton-card">
                        <p-skeleton width="100%" height="160px" class="mb-3" borderRadius="4px" />
                        <p-skeleton width="75%" height="1.2rem" class="mb-2" />
                        <p-skeleton width="45%" height="0.8rem" />
                    </div>
                }
                </div>
            } @else {
                <p-dataview [value]="playlists()">
                    <ng-template #list let-items>
                        <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                            @for (playlist of playlists(); track playlist.id) {
                                <playlist-card [playlistData]="playlist" />
                            }
                        </div>
                    </ng-template>
                </p-dataview>
            }
    

            <p-dialog header="Create New Playlist" [modal]="true" [(visible)]="createPlaylistDialogVisible" [style]="{ width: '25rem' }">
                <div class="flex items-center gap-4 mb-4">
                    <label for="title" class="font-semibold w-24">Title</label>
                    <input pInputText id="title" class="flex-auto" autocomplete="off"  [(ngModel)]="playlistTitle"/>
                </div>
                <div class="flex justify-end gap-2">
                    <p-button label="Cancel" severity="secondary" (click)="createPlaylistDialogVisible = false" />
                    <p-button label="Create" (click)="createPlaylist(playlistTitle)" />
                </div>
            </p-dialog>
        </div>
    `,
    standalone: true
})
export class PlaylistList implements OnInit {
    playlistStore = inject(PlaylistStore);
    playlistService = inject(PlaylistService);
    private messageService = inject(MessageService);
    createPlaylistDialogVisible: boolean = false;
   playlists = this.playlistStore.playlists;

    playlistTitle : string = '';

    showCreateDialog() {
        this.createPlaylistDialogVisible = true;
    }

    ngOnInit(): void {
        this.playlistStore.loadPlaylists()
    }

    createPlaylist(title: string) {
        console.log(title)
        if(title === "") {
            return;
        }

        this.createPlaylistDialogVisible = false;
        this.playlistService.addPlaylist(title);
        this.playlistStore.addPlaylist(title);
        this.messageService.add({severity: 'success', detail: 'Playlist Created!'})
    }
    
}