import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'playlist-view',
    imports: [],
    styles: ``,
    template: ``,
    standalone: true
})
export class PlaylistView implements OnInit {
    private route = inject(ActivatedRoute);
    playlist: any;

    ngOnInit() {
        this.route.data.subscribe(({ playlistData }) => {
            this.playlist = playlistData; // from route resolvers
        });
    }

}