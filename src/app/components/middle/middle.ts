import { Component, computed, inject } from '@angular/core';
import { TargetMovie } from '../../services/target-movie';
import { Tmdb } from '../../services/tmdb';

@Component({
  selector: 'app-middle',
  imports: [],
  templateUrl: './middle.html',
  styleUrl: './middle.css',
})
export class Middle {
  private tmdb = inject(Tmdb);
  private targetMovie = inject(TargetMovie);

  title = computed(() => this.targetMovie.targetMovie()?.title);
  description = computed(() => this.targetMovie.targetMovie()?.description);
  imageURL = computed(() => {
    return this.tmdb.getImageURL(
      this.tmdb.imageSizes().at(-1),
      this.targetMovie.targetMovie()?.imageURLEnd,
    );
  });
}
