import { Component } from '@angular/core';
import { TopHeader } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PlaylistGrid } from '../playlist-view/components/playlist-grid.component';
import { ArtistGrid } from '../artist-view/components/artist-grid.component';
import { AlbumsGrid } from '../album-view/components/album-grid.component';
import { TracksGrid } from '../track-view/components/track-grid.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ PlaylistGrid, ArtistGrid, AlbumsGrid, TracksGrid, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
