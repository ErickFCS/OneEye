import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Config } from '../types/config';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root',
})
export class Tmdb {
  private baseURL = signal('');
  private imageSizes = signal<string[]>([]);
  private http = inject(HttpClient);
  movies = signal<Movie[]>([]);

  loadConfig() {
    this.http.get<Config>('/api/config').subscribe((config) => {
      this.baseURL.set(config.baseURL);
      this.imageSizes.set(config.imageSizes);
    });
  }

  search(query: string) {
    if (this.baseURL() === '') this.loadConfig();
    this.http.get<Movie[]>(`/api/query?query=${query}`).subscribe((movies) => {
      this.movies.set(movies);
    });
  }

  getImageURL(size: string, imageURLEnd: string) {
    if(this.movies().length === 0) return ''
    if(!this.imageSizes().includes(size)) throw {reason: "that is not a valid image size"}
    return `${this.baseURL}${size}${imageURLEnd}`
  }
}
