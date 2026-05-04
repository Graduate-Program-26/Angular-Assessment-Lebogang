import {Component, input} from '@angular/core';
import { Album } from '../album.model';
@Component({
    selector: 'album-card',
    imports: [],
    styles: `
        .album-card {
            background: #ffffff;
            border: 1px solid rgba(55, 53, 47, 0.08);
            border-radius: 6px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            box-shadow: 0 1px 3px rgba(55, 53, 47, 0.04);
            transition: all 0.1s ease-in-out;
            cursor: pointer;
        }

        .album-card:hover {
            border-color: rgba(55, 53, 47, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 3px 10px rgba(55, 53, 47, 0.06);
        }

        .album-img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid rgba(55, 53, 47, 0.04);
        }

        .album-details {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .album-title {
            margin: 0;
            font-size: 0.95rem;
            font-weight: 600;
            color: #37352f;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .album-artist {
            font-size: 0.8rem;
            color: rgba(55, 53, 47, 0.5);
            margin-bottom: 8px;
        }

        .album-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.7rem;
            color: rgba(55, 53, 47, 0.4);
        }
    
    `,
    template: `
        <div class="album-card">
            <img [src]="albumData.cover_medium" [alt]="albumData.title" class="album-img" />
            <div class="album-details">
                <h4 class="album-title">{{ albumData.title }}</h4>
                <span class="album-artist">{{ albumData.artist.name }}</span>
                <div class="album-meta">
                    <span>{{ albumData.nb_tracks }} tracks</span>
                    <span>{{ albumData.release_date }}</span>
                </div>
            </div>
        </div>
    `
})
export class AlbumnCard {
    albumData = input.required<Album>()
}   