import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPage } from './pages/landing.page';
import { TopHeader } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPage, TopHeader, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('crescendo');
  //landing page
}
