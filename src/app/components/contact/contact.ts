import { Component, signal } from '@angular/core';

interface entry {
  value: string;
  id: number;
}

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  entries = signal<entry[]>([
    {
      id: 1,
      value: "emaildirecction@emailprovider.com"
    },
    {
      id: 2,
      value: "ErickFCS"
    },
  ]);
}
