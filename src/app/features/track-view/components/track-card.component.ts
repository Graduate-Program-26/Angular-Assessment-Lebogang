import {Component, input } from '@angular/core'
import { Track } from '../track.model'

@Component({
    selector: 'track-card',
    imports: [],
    styles: `
    .database-row {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid rgba(55, 53, 47, 0.04);
            transition: background-color 0.1s ease;
            cursor: pointer;
        }

        .database-row:last-child {
            border-bottom: none;
        }

        .database-row:hover {
            background-color: rgba(55, 53, 47, 0.04);
        }

        .col-title {
            flex: 2;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
        }

        .col-artist {
            flex: 1.5;
            color: rgba(55, 53, 47, 0.7);
        }

        .col-album {
            flex: 1.5;
            color: rgba(55, 53, 47, 0.5);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .col-duration {
            flex: 0.5;
            text-align: right;
            color: rgba(55, 53, 47, 0.5);
        }

        .track-thumb {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            object-fit: cover;
            border: 1px solid rgba(55, 53, 47, 0.06);
        }

        .explicit-tag {
            background: rgba(55, 53, 47, 0.08);
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 0.65rem;
            color: rgba(55, 53, 47, 0.6);
            font-weight: 700;
        }

    `,
    template: `
        <div class="database-row">
            <div class="col-title">
                <img [src]="trackData.album.cover_medium" [alt]="trackData.title" class="track-thumb" />
                <span class="track-name">{{ trackData.title }}</span>
                @if (trackData.explicit_lyrics) {
                    <span class="explicit-tag">E</span>
                }
            </div>
            <div class="col-artist">{{ trackData.artist.name }}</div>
            <div class="col-album">{{ trackData.album.title }}</div>
            <div class="col-duration">{{ trackData.duration) }}</div>
        </div>
    
    `
})
export class TrackCard {
    trackData = input.required<Track>();


    // @TODO: use pipe to format duration
}