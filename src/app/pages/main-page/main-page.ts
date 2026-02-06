import { Component } from '@angular/core';
import { Searchbar } from '../../components/searchbar/searchbar';
import { Title } from '../../components/title/title';
import { Middle } from '../../components/middle/middle';
import { Hero } from '../../components/hero/hero';

@Component({
  selector: 'app-main-page',
  imports: [Searchbar, Title, Middle, Hero],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
