import { Track } from "../track-view/track.model";

export interface ArtistSummary {
    id: string;
    name: string;
    picture_small?: string;
}

export interface Album {
    id: string;
    title: string;
    link: string;
    cover: string;
    cover_medium: string;
    release_date: string;
    nb_tracks: number;
    duration: number;
    label?: string;
    artist: ArtistSummary;
}

export interface EnrichedAlbum extends Album {
  tracks: Track[];
}