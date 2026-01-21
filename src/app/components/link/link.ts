import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-link',
  imports: [],
  templateUrl: './link.html',
  styleUrl: './link.css',
})
export class Link {
  text = signal('Click Here');
  linkURL = signal('www.google.com');
}
