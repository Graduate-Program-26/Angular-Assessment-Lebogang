import { Component, inject, signal, OnInit } from '@angular/core'
import { TrackCard } from './track-card.component';
import { TracksService } from '../services/tracks.service';
import { Track } from '../track.model';
@Component({
    selector: 'tracks-grid',
    imports: [TrackCard],
    styles: ``,
    template: `
        <div class="flex flex-col">
            @for (track of tracks(); track track.id) {
                <track-card [trackData]="track" />
            }
        </div>
    `
})
export class TracksGrid implements OnInit {
    trackService = inject(TracksService);

    tracks = signal<Track[]>([]);

    async ngOnInit() {
        try {
            const data = await this.trackService.getChartedTracks()

            this.tracks.set(data)
        } catch (error) {

        }
    }
}