import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'artist-view',
    imports: [],
    styles: ``,
    template: ``,
    standalone: true
})
export class ArtistView implements OnInit {
    private route = inject(ActivatedRoute);
    artist : any;

    ngOnInit() {
        this.route.data.subscribe(({artistData}) => {
            this.artist = artistData; 
        })
    }
}