import { TestBed } from '@angular/core/testing';
import { Tmdb } from './tmdb';
import { Config } from '../types/config';
import { Movie } from '../types/movie';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('TmdbService', () => {
  let service: Tmdb;
  let httpMock: HttpTestingController;

  // Reusable mock data
  const mockConfig: Config = {
    baseURL: 'https://image.tmdb.org/t/p/',
    imageSizes: ['w300', 'w780', 'original'],
  };

  const mockMovies: Movie[] = [
    { id: 1, title: 'Test Movie', description: '', rating: 5, imageURLEnd: 'test.jpg' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Tmdb, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(Tmdb);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifies that no requests were left unmatched
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loadConfig', () => {
    it('should fetch config and update signals', () => {
      service.loadConfig().subscribe();

      const req = httpMock.expectOne('/api/config');
      expect(req.request.method).toBe('GET');

      // Reply with the mock data
      req.flush(mockConfig);

      expect(service.baseURL()).toBe(mockConfig.baseURL);
      expect(service.imageSizes()).toEqual(mockConfig.imageSizes);
    });
  });

  describe('#search', () => {
    it('should chain requests: load config FIRST (if missing), then fetch movies', () => {
      expect(service.baseURL()).toBe('');

      service.search('matrix', 1).subscribe((movies) => {
        expect(movies).toEqual(mockMovies);
      });

      // Config is requested first cause baseURL is empty
      const configReq = httpMock.expectOne('/api/config');
      configReq.flush(mockConfig);

      // Expect Query Request after the config request
      const searchReq = httpMock.expectOne('/api/query?query=matrix&page=1');
      searchReq.flush(mockMovies);

      expect(service.movies()).toEqual(mockMovies);
    });

    it('should NOT fetch config if it is already loaded', () => {
      service.loadConfig().subscribe();
      const configReq = httpMock.expectOne('/api/config');
      configReq.flush(mockConfig);

      service.search('inception', 1).subscribe();

      const searchReq = httpMock.expectOne('/api/query?query=inception&page=1');
      searchReq.flush(mockMovies);

      // httpMock.verify() in afterEach will fail if an extra config request happened
    });
  });

  describe('#getImageURL', () => {
    // Signal population
    const setupConfig = () => {
      service.loadConfig().subscribe();
      httpMock.expectOne('/api/config').flush(mockConfig);
    };

    it('should return empty string if inputs are missing', () => {
      expect(service.getImageURL(undefined, 'test.jpg')).toBe('');
      expect(service.getImageURL('w300', undefined)).toBe('');
    });

    it('should construct the correct URL when size is valid', () => {
      setupConfig();

      const url = service.getImageURL('w300', 'poster.jpg');
      expect(url).toBe('https://image.tmdb.org/t/p/w300poster.jpg');
    });

    it('should throw an error if the image size is invalid', () => {
      setupConfig();

      expect(() => {
        service.getImageURL('invalid-size', 'poster.jpg');
      }).toThrow('that is not a valid image size');
    });
  });
});
