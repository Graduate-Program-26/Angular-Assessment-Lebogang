import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./app').then(m => m.App), // Landing page
    }, 
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
        canActivate: [authGuard]
    },
    {
        path: 'artist',
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./components/artist-view/artist-list.component').then(m => m.ArtistList)
            },
            {
                path: ':id',
                loadComponent: () => import('./components/artist-view/artist-view.component').then(m => m.ArtistView),
                children: [
                    {
                        path: 'albums',
                        loadComponent: () => import('./components/album-view/album-list.component').then(m => m.AlbumList) // list of albums for a specific artist
                    },
                    {
                        path: 'tracks',
                        loadComponent: () => import('./components/track-view/track-list.component').then(m => m.TrackList) // list of tracks for a specific artist
                    }
                ]
            }
        ]
    },
    {
        path: 'albums/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./components/album-view/album-view.component').then(m => m.AlbumnView) // Accessible globally
    },
    {
        path: 'track/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./components/track-view/track-view.component').then(m => m.TrackView)
    },
    {
        path: 'playlists',
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./components/playlist-view/playlist-list.component').then(m => m.PlaylistList) // Renders all user playlists
            },
            {
                path: ':id', // Renders a specific playlist
                loadComponent: () => import('./components/playlist-view/playlist-view.component').then(m => m.PlaylistView)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found').then(m => m.NotFoundPage)
    }
];