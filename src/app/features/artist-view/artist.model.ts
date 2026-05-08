import { Album } from "../album-view/album.model"
import { Track } from "../track-view/track.model"
export interface Artist {
    id: string,
    name: string,
    link: string,
    picture: string,
    picture_small: string,
    picture_medium?: string,
    picture_big?: string
}

export interface ArtistViewDetails {
    albums: Album[],
    tracks: Track[]
}