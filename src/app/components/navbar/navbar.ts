import { Component } from '@angular/core';
import { Theme } from '../theme/theme';

@Component({
  selector: 'app-navbar',
  imports: [Theme],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
