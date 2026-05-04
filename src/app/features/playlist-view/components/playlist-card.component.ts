import {Component} from '@angular/core'
import { Playlist } from '../playlist.model'
import { input } from '@angular/core'


@Component({
    selector: 'playlist-card',
    imports: [],
    styles: `
        .playlist-card {
            background: #ffffff;
            border: 1px solid rgba(55, 53, 47, 0.08);
            border-radius: 6px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            cursor: pointer;
            transition: all 0.1s ease-in-out;
            box-shadow: 0 1px 3px rgba(55, 53, 47, 0.05);
            height: 100%;
        }

        .notion-playlist-card:hover {
            border-color: rgba(55, 53, 47, 0.2);
            box-shadow: 0 3px 10px rgba(55, 53, 47, 0.06);
            transform: translateY(-2px);
        }

        .cover-wrapper {
            position: relative;
            width: 100%;
            height: 160px;
            border-radius: 4px;
            overflow: hidden;
            background: rgba(55, 53, 47, 0.04);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .default-cover-icon {
            font-size: 2rem;
            color: rgba(55, 53, 47, 0.3);
        }

        .card-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .card-title {
            margin: 0;
            font-size: 0.95rem;
            font-weight: 600;
            color: #37352f;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.75rem;
            color: rgba(55, 53, 47, 0.5);
        }
    `,
    template: `
        <div class="playlist-card">
            <div class="cover-wrapper">
               <i class="pi pi-music default-cover-icon"></i>
            </div>


            <div class="card-content">
                <h3 class="card-title">{{playlistData().title}}</h3>
                <div class="card-meta">
                    <span>{{ playlistData().tracks.length }} tracks</span>
                    <span>{{ playlistData().duration }}</span>
                </div>            
            </div>
        </div>
    `
})
export class PlaylistCard {
    playlistData = input.required<Playlist>();
}