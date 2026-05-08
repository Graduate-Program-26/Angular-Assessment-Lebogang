import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

import { artistResolver, trendingArtistResolver } from './features/artist-view/resolvers/artists.resolver';
import { playlistResolver } from './features/playlist-view/resolvers/playlists.resolver';
import { albumResolver, albumsResolver, tredingAlbumResolver } from './features/album-view/resolvers/albums.resolver';
import { trackResolver, tracksResolver, trendingTracksResolver } from './features/track-view/resolvers/tracks.resolver';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./app').then(m => m.App), // Landing page
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
        canActivate: [authGuard],
        data: { breadcrumb: 'Home' }
    },
    {
        path: 'artist',
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                resolve: {
                    artistData: trendingArtistResolver
                },
                loadComponent: () => import('./features/artist-view/components/artist-list.component').then(m => m.ArtistList)
            },
            {
                path: ':id',
                loadComponent: () => import('./features/artist-view/components/artist-view.component').then(m => m.ArtistView),
                data: { breadcrumb: 'Artist' },
                resolve: {
                    artistData: artistResolver
                },
                children: [
                    {
                        path: 'albums',
                        data: { breadcrumb: 'Albums' },
                        resolve: {
                            albumsData: albumsResolver
                        },
                        loadComponent: () => import('./features/album-view/components/album-list.component').then(m => m.AlbumList) // list of albums for a specific artist
                    },
                    {
                        path: 'tracks',
                        data: { breadcrumb: 'Tracks' },
                        resolve: {
                            tracks: tracksResolver
                        },
                        loadComponent: () => import('./features/track-view/components/track-list.component').then(m => m.TrackList) // list of tracks for a specific artist
                    }
                ]
            }
        ]
    },
    {
        path: 'albums/:id',
        canActivate: [authGuard],
        data: { breadcrumb: 'Album' },
        resolve: {
            albumData: albumResolver
        },
        loadComponent: () => import('./features/album-view/components/album-view.component').then(m => m.AlbumnView) // Accessible globally
    },
    {
        path: 'tracks/:id',
        canActivate: [authGuard],
        data: { breadcrumb: 'Track' },
        resolve: {
            trackData: trackResolver
        },
        loadComponent: () => import('./features/track-view/components/track-view.component').then(m => m.TrackView)
    },
    {
        path: 'albums',
        canActivate: [authGuard],
        data: { breadcrumb: 'Albums' },
        resolve: {
            albumData: tredingAlbumResolver
        },
        loadComponent: () => import('./features/album-view/components/album-list.component').then(m => m.AlbumList) // list of albums for a specific artist
    },
    {
        path: 'tracks',
        canActivate: [authGuard],
        data: { breadcrumb: 'Tracks' },
        resolve: {
            trackData: trendingTracksResolver
        },
        loadComponent: () => import('./features/track-view/components/track-list.component').then(m => m.TrackList) // list of tracks for a specific artist

    },
    {
        path: 'playlists',
        canActivateChild: [authGuard],
        data: { breadcrumb: 'Playlists' },
      
        children: [
            {
                path: '',
                loadComponent: () => import('./features/playlist-view/components/playlist-list.component').then(m => m.PlaylistList) // Renders all user playlists
            },
            {
                path: ':id', // Renders a specific playlist
                data: { breadcrumb: 'Playlist' },
                  resolve: playlistResolver,
                loadComponent: () => import('./features/playlist-view/components/playlist-view.component').then(m => m.PlaylistView)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found.page').then(m => m.NotFoundPage)
    }
];