import { Routes } from '@angular/router';
import { ArtistView } from './components/artist-view/artist-view.component';
import { ArtistList } from './components/artist-view/artist-list.component';
import { PlaylistView } from './components/playlist-view/playlist-view.component';
import { PlaylistList } from './components/playlist-view/playlist-list.component';
import { AlbumnView } from './components/album-view/album-view.component';
import { AlbumList } from './components/album-view/album-list.component';
import { TrackView } from './components/track-view/track-view.component';
import { TrackList } from './components/track-view/track-list.component';
import { Home } from './pages/home/home';
import { NotFoundPage } from './pages/not-found';
import { App } from './app';

import { authGuard } from './guard/auth-guard';
export const routes: Routes = [
    {
        path: '',
        component: App, // lamding page
    }, 
    {
        path: 'home',
        component: Home ,
        canActivate: [authGuard]
    },
    {
        path: 'artist',
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                component: ArtistList
            },
            {
                path: ':id',
                component: ArtistView,
                children: [
                    {
                        path: 'albums',
                        component: AlbumList // list of albums for a specific artist
                    },
                    {
                        path: 'tracks',
                        component: TrackList // list of tracks for a specific artist
                    }
                ]
            }
        ]
    },
    {
        path: 'albums/:id',
        canActivate: [authGuard],
        component: AlbumnView // Accessible globally, just like track/:id
    },
    {
        path: 'track/:id',
         canActivate: [authGuard],
        component: TrackView
    },
    {
        path: 'playlists',
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                component: PlaylistList // Renders all user playlists
            },
            {
                path: ':id', // Renders a specific playlist
                component: PlaylistView
            }
        ]
    },
    {
        path: '**',
        component: NotFoundPage
    }
];