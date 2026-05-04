import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { inject } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Track } from '../../track-view/track.model';
import { PlaylistState } from '../playlist.model';


const initialState: PlaylistState = {
    playlists: [],
    selectedPlaylistId: null,
    isLoading: false,
    error: null
};


export const PlaylistStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, storageService = inject(PlaylistService)) => ({
        async loadPlaylists() {
            patchState(store, { isLoading: true });
            try {
                const data = await storageService.getPlaylists(); // Fetch from IDB
                patchState(store, { playlists: data, isLoading: false });
            } catch (error) {
                patchState(store, { error: 'Failed to load playlists', isLoading: false });
            }
        },

        async addPlaylist(title: string) {
            const newPlaylist = await storageService.addPlaylist(title);
            patchState(store, (state) => ({
                playlists: [...state.playlists, newPlaylist]
            }));
        },

        async addTrackToPlaylist(playlistId: string, track: Track) {
            await storageService.addTrackToPlaylist(playlistId, track);

            patchState(store, (state) => ({
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === playlistId) {
                        return { ...playlist, tracks: [...playlist.tracks, track] };
                    }
                    return playlist;
                })
            }));
        },

        async renamePlaylist(playlistId: string, newTitle: string) {
            await storageService.updatePlaylist(playlistId, {title: newTitle})

            patchState(store, (state) => ({
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === playlistId) {
                      return { ...playlist, title: newTitle };
                    }
                    return playlist;
                })
            }));
        },

        async deletePlaylist(playlistId: string) {
            await storageService.deletePlaylist(playlistId);

            patchState(store, (state) => ({
                playlists: state.playlists.filter(playlist => playlist.id !== playlistId)
            }))
        }
    })),
    withHooks(({ loadPlaylists }) => ({
        onInit() {
            loadPlaylists();
        }
    }))
);