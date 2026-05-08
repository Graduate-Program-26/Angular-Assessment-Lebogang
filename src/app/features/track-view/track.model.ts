export interface ArtistMinimal {
    id: number;
    name: string;
}

export interface AlbumMinimal {
    id: string;
    title: string;
    cover_medium: string;
    cover_xl?: string
}

export interface Track {
    id: string;
    title: string;
    link: string;
    duration: string;
    release_date: string;
    explicit_lyrics: boolean;
    preview: string;
    artist?: ArtistMinimal;
    album?: AlbumMinimal;
}