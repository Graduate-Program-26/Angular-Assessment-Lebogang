
import {Component, signal} from '@angular/core'
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { DataViewModule, DataView } from 'primeng/dataview';
import { PlaylistCard } from './playlist-card.component';
import { MOCK_PLAYLISTS } from '../mock-data/playlists.mock';
@Component({
    selector: 'playlist-list',
    imports: [DialogModule, ButtonModule, InputTextModule, MultiSelectModule, PlaylistCard, SkeletonModule, DataView],
    styles: ``,
    template: `
        <div class="workspace-content">
            <header class="list-header">
                <h1 class="n-title">📋 Playlist Database</h1>
                <p-button (click)="showCreateDialog()" label="Create Playlist" />
            </header>

    
            <p-data-view [value]="playlists()">
                <ng-template pTemplate="list" let-items>
                    <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                        @for (playlist of items; track playlist.id) {
                            <playlist-card [playlistData]="playlist" />
                        }
                    </div>
                </ng-template>
            </p-data-view>

            <p-dialog header="Create New Playlist" [modal]="true" [(visible)]="createPlaylistDialogVisible" [style]="{ width: '25rem' }">
            
                <div class="flex items-center gap-4 mb-4">
                    <label for="title" class="font-semibold w-24">Title</label>
                    <input pInputText id="title" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex justify-end gap-2">
                    <p-button label="Cancel" severity="secondary" (click)="createPlaylistDialogVisible = false" />
                    <p-button label="Save" (click)="createPlaylistDialogVisible = false" />
                </div>
            </p-dialog>
        </div>
    `,
    standalone: true
})
export class PlaylistList {
    createPlaylistDialogVisible: boolean = false;
    playlists = signal(MOCK_PLAYLISTS)

    showCreateDialog() {
        this.createPlaylistDialogVisible = true;
    }
}