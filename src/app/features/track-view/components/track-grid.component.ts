import {Component, signal} from '@angular/core'
import { MOCK_TRACKS } from '../mock-data/tracks.mock';
import { TrackCard } from './track-card.component';
@Component({
    selector: 'tracks-grid',
    imports: [TrackCard],
    styles: ``,
    template: `
        <div class="flex flex-col">
            @for (trcak of tracks(); track track.id) {
                <track-card [trackData]="track" />
            }
        </div>
    `
})
export class TracksGrid {
    tracks = signal(MOCK_TRACKS);
}