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
