import { Component, signal, inject } from "@angular/core";
import { PlaylistCard } from "./playlist-card.component"; 
import { PlaylistStore } from "../state/playlist.store";
import { Playlist } from "../playlist.model";
@Component({
    selector: 'playlist-grid',
    imports: [PlaylistCard],
    styles: ``,
    template: `
        <div class="flex flex-col">
            @for (playlist of playlists().slice(0, 5); track playlist.id) {
                <playlist-card [playlistData]="playlist"/>
            }
        </div>
    `
})
export class PlaylistGrid {
    playlistStore = inject(PlaylistStore);
    playlists = this.playlistStore.playlists ||  signal<Playlist[]>([]);

}