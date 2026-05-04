import { Playlist } from "../playlist.model"; 
import { MOCK_TRACKS } from "../../track-view/mock-data/tracks.mock";
export const MOCK_PLAYLISTS: Playlist[] = [
    {
        id: '1',
        title: '☕ Deep Work',
        tracks: [MOCK_TRACKS[0], MOCK_TRACKS[3]],
        duration: 135 // in minutes
    },
    {
        id: '2',
        title: '🏋️ Gym Motivation',
        tracks: [MOCK_TRACKS[0], MOCK_TRACKS[2]],
        duration: 50 
    },
    {
        id: '3',
        title: '🎸 Late Night Coding',
        tracks: [MOCK_TRACKS[1], MOCK_TRACKS[2], MOCK_TRACKS[3]],
        duration: 302
    }
];