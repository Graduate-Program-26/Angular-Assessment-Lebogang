import { Component, signal } from "@angular/core";
import { PlaylistCard } from "./playlist-card.component";
import { MOCK_PLAYLISTS } from "../../mock-data/playlists.mock";
@Component({
    selector: 'playlist-grid',
    imports: [PlaylistCard],
    styles: ``,
    template: `
        <div class="flex flex-col">
            @for (playlist of playlists(); track playlist.id) {
                <playlist-card [playlistData]="playlist"/>
            }
        </div>

    `
})
export class PlaylistGrid {
    playlists = signal(MOCK_PLAYLISTS)
}