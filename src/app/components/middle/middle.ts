import { Component, computed, inject } from '@angular/core';
import { TargetMovie } from '../../services/target-movie';
import { Tmdb } from '../../services/tmdb';
import { Rating } from '../rating/rating';

@Component({
  selector: 'app-middle',
  imports: [Rating],
  templateUrl: './middle.html',
  styleUrl: './middle.css',
})
export class Middle {
  private tmdb = inject(Tmdb);
  private targetMovie = inject(TargetMovie).targetMovie;

  title = computed(() => this.targetMovie()?.title);
  description = computed(() => this.targetMovie()?.description);
  stars = computed(() => this.targetMovie()?.rating || 0);
  imageURL = computed(() => {
    return this.tmdb.getImageURL(this.tmdb.imageSizes().at(-1), this.targetMovie()?.imageURLEnd);
  });
  loading = computed(() => false);
}
