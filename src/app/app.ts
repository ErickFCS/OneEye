import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alert } from './components/alert/alert';
import { Dropdown } from './components/dropdown/dropdown';
import { Footer } from './components/footer/footer';
import { Link } from './components/link/link';
import { Loading } from './components/loading/loading';
import { Navbar } from './components/navbar/navbar';
import { Searchbar } from './components/searchbar/searchbar';
import { Title } from './components/title/title';
import { Card } from './components/card/card';
import { Middle } from './components/middle/middle';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    Alert,
    Card,
    Dropdown,
    Footer,
    Hero,
    Link,
    Loading,
    Middle,
    Navbar,
    Searchbar,
    Title
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('movieSearcher');
}
