import { Track } from "../track.model";

export const MOCK_TRACKS: Track[] = [
    {
        id: 1,
        title: 'Neon City',
        link: 'https://example.com/tracks/1',
        preview: 'https://example.com/previews/1',
        album: {
            id: 101,
            title: 'Days of Thunder',
            link: 'https://example.com/albums/101',
            cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80'
        }
    },
    {
        id: 2,
        title: 'Rainy Day',
        link: 'https://example.com/tracks/2',
        preview: 'https://example.com/previews/2',
        album: {
            id: 102,
            title: 'Lofi Girl - Study Beats',
            link: 'https://example.com/albums/102',
            cover: 'https://images.unsplash.com/photo-1518173946687-a4c88383e52e?w=300&auto=format&fit=crop&q=80'
        }
    },
    {
        id: 3,
        title: 'Awake',
        link: 'https://example.com/tracks/3',
        preview: 'https://example.com/previews/3',
        album: {
            id: 103,
            title: 'Epoch',
            link: 'https://example.com/albums/103',
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80'
        }
    },
    {
        id: 4,
        title: 'Weightless',
        link: 'https://example.com/tracks/4',
        preview: 'https://example.com/previews/4',
        album: {
            id: 104,
            title: 'Ambient Works',
            link: 'https://example.com/albums/104',
            cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f06c?w=300&auto=format&fit=crop&q=80'
        }
    }
];
