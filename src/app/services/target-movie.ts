import { Injectable, signal } from '@angular/core';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root',
})
export class TargetMovie {
  targetMovie = signal<Movie | undefined>(undefined);
}
