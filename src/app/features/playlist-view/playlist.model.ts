import { Track } from "../track-view/track.model"

export interface Playlist {
    id: string,
    tracks: Track[],
    title: string,
    duration? : number
   
}

export interface PlaylistState {
    playlists: Playlist[];
    selectedPlaylistId: string | null;
    isLoading: boolean;
    error: string | null;
}