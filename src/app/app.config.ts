import {
  ApplicationConfig,
  inject,
  makeStateKey,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  TransferState,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Tmdb } from './services/tmdb';
import { TargetMovie } from './services/target-movie';
import { lastValueFrom, map, of, switchMap, tap } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { Movie } from './types/movie';

const MOVIE_KEY = makeStateKey<Movie>('RANDOM_MOVIE_DATA');

const initializeApp = () => {
  const plataformID = inject(PLATFORM_ID);
  const tmdb = inject(Tmdb);
  const targetMovie = inject(TargetMovie).targetMovie;
  const transferState = inject(TransferState);

  const page = Math.floor(Math.random() * 100);
  const index = Math.floor(Math.random() * 20);
  return lastValueFrom(
    tmdb.loadConfig().pipe(
      switchMap(() => {
        if (!transferState.hasKey(MOVIE_KEY)) {
          return tmdb.search('', page).pipe(map((movies) => movies.at(index)));
        }
        const savedMovie = transferState.get(MOVIE_KEY, undefined);
        transferState.remove(MOVIE_KEY);
        return of(savedMovie);
      }),
      tap((randomMovie) => {
        if (isPlatformServer(plataformID)) {
          transferState.set(MOVIE_KEY, randomMovie);
        }
        targetMovie.set(randomMovie);
      }),
    ),
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAppInitializer(initializeApp),
  ],
};
