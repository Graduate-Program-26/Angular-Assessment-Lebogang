import { Routes } from '@angular/router';
import path from 'node:path';

export const routes: Routes = [
{
    path: 'home',

},
{
    path: 'artist/:id',
    children: [
        // albums
        // albums/tracks
    
    ]
},
{
    path: 'track/:id/'
},
{
 path: 'playlists',
 children: [
    // playlist/:id
 ]
}


];
