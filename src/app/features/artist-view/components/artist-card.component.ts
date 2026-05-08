import {Component, input} from '@angular/core'
import { Artist } from '../artist.model'
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'artist-card',
    imports: [ButtonModule, RouterLink],
    styles: `
    .artist-card {
            background: #ffffff;
            border: 1px solid rgba(55, 53, 47, 0.08);
            border-radius: 6px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
            box-shadow: 0 1px 3px rgba(55, 53, 47, 0.04);
            transition: all 0.1s ease-in-out;
        }

        .artist-card:hover {
            border-color: rgba(55, 53, 47, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 3px 10px rgba(55, 53, 47, 0.06);
        }

        .artist-img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid rgba(55, 53, 47, 0.06);
        }

        .artist-details h4 {
            margin: 0 0 0.25rem 0;
            font-size: 0.95rem;
            color: #37352f;
            font-weight: 600;
        }

        .artist-link {
            font-size: 0.75rem;
            color: rgba(55, 53, 47, 0.5);
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .artist-link:hover {
            color: #37352f;
            text-decoration: underline;
        }
    `,
    template: `
        <div class="artist-card">
            <img [src]="artistData().picture_small" [alt]="artistData().name" class="artist-img" />
            <div class="artist-details">
                <h4>{{ artistData().name }}</h4>
                <p-button class="artist-link"  [routerLink]="['/artist', artistData().id]">View Profile</p-button>
            </div>
        </div>
    `
})
export class ArtistCard {
    artistData = input.required<Artist>();
}