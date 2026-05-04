import { Album } from "../album.model";

export const MOCK_ALBUMS: Album[] = [
    {
        id: '302127',
        title: 'Discovery',
        link: 'https://www.deezer.com/album/302127',
        cover: 'https://api.deezer.com/album/302127/image',
        cover_medium: 'https://cdn-images.dzcdn.net/images/cover/5718f7c81c27e0b2417e2a4c45224f8a/250x250-000000-80-0-0.jpg',
        release_date: '2001-03-07',
        nb_tracks: 14,
        duration: 3662,
        label: 'Daft Life Ltd./ADA France',
        artist: {
            id: '27',
            name: 'Daft Punk',
            picture_small: 'https://cdn-images.dzcdn.net/images/artist/638e69b9caaf9f9f3f8826febea7b543/56x56-000000-80-0-0.jpg'
        }
    },
    {
        id: '401292',
        title: 'Days of Thunder',
        link: 'https://www.deezer.com/album/401292',
        cover: 'https://api.deezer.com/album/401292/image',
        cover_medium: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=250&auto=format&fit=crop&q=80',
        release_date: '2011-06-25',
        nb_tracks: 10,
        duration: 2700,
        label: 'The Midnight Records',
        artist: {
            id: '10',
            name: 'The Midnight',
            picture_small: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=56&auto=format&fit=crop&q=80'
        }
    },
    {
        id: '501293',
        title: 'Epoch',
        link: 'https://www.deezer.com/album/501293',
        cover: 'https://api.deezer.com/album/501293/image',
        cover_medium: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=250&auto=format&fit=crop&q=80',
        release_date: '2016-01-20',
        nb_tracks: 11,
        duration: 3100,
        label: 'Ghostly International',
        artist: {
            id: '11',
            name: 'Tycho',
            picture_small: 'https://images.unsplash.com/photo-1493225457124-a3eb161fa585?w=56&auto=format&fit=crop&q=80'
        }
    }
];