import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-saves',
  imports: [],
  templateUrl: './saves.html',
  styleUrl: './saves.css',
})
export class Saves {
  iconFill = signal("none");
}
