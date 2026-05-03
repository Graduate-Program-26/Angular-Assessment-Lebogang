import { Component } from '@angular/core';
import { TopHeader } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
@Component({
  selector: 'app-home',
  imports: [TopHeader, SidebarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
}
