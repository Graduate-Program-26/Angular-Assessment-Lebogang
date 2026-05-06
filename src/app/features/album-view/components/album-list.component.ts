import { Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Album } from '../album.model';
import { AlbumnCard } from './album-card.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
interface Artist {
    id: string,
    name: string,
    picture_small: string
}
@Component({
    selector: 'album-list',
    standalone: true,
    imports: [AlbumnCard, CommonModule, ButtonModule, DataViewModule, SelectButtonModule, FormsModule],
    styles: ``,
    template: `
     <div class="card p-4">
            <header class="flex justify-content-between align-items-center mb-4">
                <h1 class="text-3xl font-bold">{{ artist().name }} Albums</h1>
            </header>

            <div>
                <p-dataview #dv [value]="albumData()" [layout]="layout">
                <ng-template #header>
                    <div class="flex justify-end">
                        <p-selectbutton [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                            <ng-template #item let-item>
                                <i class="pi " [ngClass]="{ 'pi-bars': item === 'list', 'pi-table': item === 'grid' }"></i>
                            </ng-template>
                        </p-selectbutton>
                    </div>
                </ng-template>

                 <ng-template pTemplate="grid" let-items>
                        <div class="grid grid-nogutter p-2">
                            @for (album of albumData(); track album.id) {
                                <div class="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
                                    <div class="p-3 border surface-border border-round surface-card flex flex-column align-items-center h-full">
                                        <img [src]="album.cover || 'assets/placeholder.png'" [alt]="album.title" class="w-10rem h-10rem object-cover shadow-1 border-round mb-3" />
                                        <div class="text-lg font-bold text-center mb-1 text-overflow-ellipsis white-space-nowrap overflow-hidden w-full">
                                            {{ album.title }}
                                        </div>
                                        <div class="text-500 mb-3">{{ album.release_date }}</div>
                                        <p-button label="View" icon="pi pi-eye" (onClick)="viewAlbum(album.id)"></p-button>
                                    </div>
                                </div>
                            }
                        </div>
                    </ng-template>
                </p-dataview>
            </div>

        </div>
    `
})
export class AlbumList implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    options = ['list', 'grid'];
    layout: 'list' | 'grid' = 'list';
    albumData = signal<Album[]>([]);
    artist = signal<Artist>({
        name: '',
        id: '',
        picture_small: ''
    });


    ngOnInit(): void {
        this.route.data.subscribe(({ albumData }) => {
            this.albumData.set(albumData);
            if (albumData.length > 0 && albumData[0].artist) {
                this.artist.set(albumData[0].artist);
            }
        })
    }

    viewAlbum(id: string) {
        if (id !== " ") {
            this.router.navigate(['..', 'albums', id], { relativeTo: this.route });
        }
    }
}