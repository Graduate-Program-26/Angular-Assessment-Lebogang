import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'album-view',
    imports: [],
    styles: ``,
    template: ``,
    standalone: true
})
export class AlbumnView implements OnInit {
    private route = inject(ActivatedRoute);
    album: any;

    ngOnInit() {
        this.route.data.subscribe(({albumData}) => {
            this.album = albumData;
        })
    }
}