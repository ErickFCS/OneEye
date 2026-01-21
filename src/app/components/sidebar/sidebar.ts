import { Component } from '@angular/core';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'app-sidebar',
  imports: [Avatar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
