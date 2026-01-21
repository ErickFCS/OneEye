import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  matches = signal([
    {
      id: 0,
      name: 'Hello',
      imageURL: '/avatar.png',
    },
  ]);
}
