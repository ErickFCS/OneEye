import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Saves } from '../saves/saves';
import { Theme } from '../theme/theme';

@Component({
  selector: 'app-navbar',
  imports: [Sidebar, Saves, Theme],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

}
