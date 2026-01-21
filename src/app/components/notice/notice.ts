import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-notice',
  imports: [],
  templateUrl: './notice.html',
  styleUrl: './notice.css',
})
export class Notice {
  text = signal("@copyright 2025");
}
