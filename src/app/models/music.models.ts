

export interface Track {
    id: number,
    title: string,
    link: string,
    preview: string,
    album : {
        id: number
        title: string
        link : string,
        cover: string,
    }
}


export interface Playlist {
    id: string,
    tracks: Track[],
    title: string,
    duration? : number
   
}