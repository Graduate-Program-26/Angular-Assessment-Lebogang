
import { Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Artist } from '../artist.model';
import { ArtistService } from '../services/artist.service';
@Component({
    selector: 'artist-list',
    imports: [ButtonModule, DataViewModule, SelectButtonModule, FormsModule, CommonModule],
    styles: ``,
    template: `
     <div class="card p-4">
            <header class="flex justify-content-between align-items-center mb-4">
                <h1 class="text-3xl font-bold text-900">Artists</h1>
            </header>

            <div>
                <p-dataView #dv [value]="artists()" [layout]="layout" [rows]="8" [paginator]="true">
                    
                    <ng-template #header>
                        <div class="flex justify-content-end w-full">
                            <p-selectButton [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                                <ng-template #item let-item>
                                    <i class="pi" [ngClass]="{ 'pi-bars': item === 'list', 'pi-table': item === 'grid' }"></i>
                                </ng-template>
                            </p-selectButton>
                        </div>
                    </ng-template>

                    <ng-template #grid let-items>
                        <div class="grid grid-nogutter p-2">
                            @for (artist of artists(); track artist.id) {
                                <div class="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
                                    <div class="p-3 border surface-border border-round surface-card flex flex-column align-items-center h-full">
                                        <img [src]="artist.picture_small || 'assets/placeholder.png'" [alt]="artist.name" class="w-10rem h-10rem object-cover shadow-1 border-round mb-3" />
                                        <div class="text-lg font-bold text-center mb-1 text-overflow-ellipsis white-space-nowrap overflow-hidden w-full">
                                            {{ artist.name }}
                                        </div>
                                        <p-button label="View" icon="pi pi-eye" (onClick)="viewArtist(artist.id)" />
                                    </div>
                                </div>
                            } @empty {
                                <div class="col-12 p-3 text-center text-500">
                                    No artists found.
                                </div>
                            }
                        </div>
                    </ng-template>

                    <ng-template #list let-items>
                        <div class="flex flex-col gap-3 w-full p-2">
                            @for (artist of artists(); track artist.id) {
                                <div class="flex align-items-center justify-content-between p-3 border surface-border border-round">
                                    <div class="flex align-items-center gap-3">
                                        <img [src]="artist.picture_small || 'assets/placeholder.png'" [alt]="artist.name" class="w-4rem h-4rem object-cover border-round" />
                                        <div>
                                            <div class="text-lg font-medium text-900">{{ artist.name }}</div>
                                        </div>
                                    </div>
                                    <p-button label="View" icon="pi pi-eye" [text]="true" (onClick)="viewArtist(artist.id)" />
                                </div>
                            } @empty {
                                <div class="p-3 text-center text-500 w-full">
                                    No artists found.
                                </div>
                            }
                        </div>
                    </ng-template>
                </p-dataView>
            </div>
        </div>
    `
})
export class ArtistList implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    artistService = inject(ArtistService);
    options = ['list', 'grid'];
    layout: 'list' | 'grid' = 'list';

    artists = signal<Artist[]>([]);

    ngOnInit(): void {
        this.route.data.subscribe(({ artistData }) => {
            this.artists.set(artistData);
        });

    }

    viewArtist(artistId: string): void {
        this.router.navigate(['/artist', artistId]);
    }
}