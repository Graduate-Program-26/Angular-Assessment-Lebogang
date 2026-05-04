import { Track } from "../track.model";

export const MOCK_TRACKS: Track[] = [
    {
        id: '3135556',
        title: 'Harder, Better, Faster, Stronger',
        link: 'https://www.deezer.com/track/3135556',
        duration: '226',
        release_date: '2001-03-12',
        explicit_lyrics: false,
        preview: 'https://cdnt-preview.dzcdn.net/api/1/1/6/a/2/0/6a2c0a5670afe821e08fc5154909534a.mp3',
        artist: {
            id: 27,
            name: 'Daft Punk'
        },
        album: {
            id: '302127',
            title: 'Discovery',
            cover_medium: 'https://cdn-images.dzcdn.net/images/cover/5718f7c81c27e0b2417e2a4c45224f8a/250x250-000000-80-0-0.jpg'
        }
    },
    {
        id: '820129',
        title: 'Voyager',
        link: 'https://www.deezer.com/track/820129',
        duration: '210',
        release_date: '2001-03-12',
        explicit_lyrics: false,
        preview: 'https://cdnt-preview.dzcdn.net/api/1/1/6/a/2/0/6a2c0a5670afe821e08fc5154909534a.mp3',
        artist: {
            id: 27,
            name: 'Daft Punk'
        },
        album: {
            id: '302127',
            title: 'Discovery',
            cover_medium: 'https://cdn-images.dzcdn.net/images/cover/5718f7c81c27e0b2417e2a4c45224f8a/250x250-000000-80-0-0.jpg'
        }
    }
];