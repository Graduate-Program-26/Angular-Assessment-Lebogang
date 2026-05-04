import { Component } from '@angular/core';
import { TopHeader } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PlaylistGrid } from '../../components/playlist-view/playlist-grid.component';

@Component({
  selector: 'app-home',
  imports: [TopHeader, SidebarComponent, PlaylistGrid],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
