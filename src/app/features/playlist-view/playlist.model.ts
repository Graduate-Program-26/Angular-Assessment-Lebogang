import { Track } from "../track-view/track.model"

export interface Playlist {
    id: string,
    tracks: Track[],
    title: string,
    duration? : number
   
}

