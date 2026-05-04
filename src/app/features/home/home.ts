import { Component } from '@angular/core';
import { TopHeader } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PlaylistGrid } from '../playlist-view/components/playlist-grid.component';
import { ArtistGrid } from '../artist-view/components/artist-grid.component';
import { AlbumsGrid } from '../album-view/components/album-grid.component';
@Component({
  selector: 'app-home',
  imports: [TopHeader, SidebarComponent, PlaylistGrid, ArtistGrid, AlbumsGrid],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
