import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { Searchbar } from './components/searchbar/searchbar';
import { Title } from './components/title/title';
import { Middle } from './components/middle/middle';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Hero, Middle, Navbar, Searchbar, Title],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('movieSearcher');
}
