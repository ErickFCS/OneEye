import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-middle',
  imports: [],
  templateUrl: './middle.html',
  styleUrl: './middle.css',
})
export class Middle {
  title = signal('Movie title');
  description = signal('movie description very large');
  imageURL = signal('/back.png');
}
