import { Track } from "../track.model";

export const MOCK_TRACKS: Track[] = [
    {
        id: '3135556',
        title: 'Harder, Better, Faster, Stronger',
        link: 'https://www.deezer.com/track/3135556',
        duration: '226',
        release_date: '2001-03-12',
        explicit_lyrics: false,
        preview: "https://cdnt-preview.dzcdn.net/api/1/1/a/d/d/0/addd8f83f80a32e2388a37bd664a8ba7.mp3?hdnea=exp=1777974391~acl=/api/1/1/a/d/d/0/addd8f83f80a32e2388a37bd664a8ba7.mp3*~data=user_id=0,application_id=42~hmac=a56f1eb55c829c6540149a098c5e31a60b79e46890e35917c7fd498f5b9ab986%22",
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
        preview:  "https://stock.adobe.com/za/search/audio?k=1991144426",
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