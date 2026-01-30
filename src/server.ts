import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

import 'dotenv/config';
import { MovieDb } from 'moviedb-promise';
import { map } from 'rxjs';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const tmdb_api_key = process.env?.['TMDB_API_KEY'] || '';
if (!tmdb_api_key) {
  console.log('Empty API key');
  process.exit(1);
}
const moviedb = new MovieDb(tmdb_api_key);

/**
 * General information
 */
app.get('/api/config', async (_req, res) => {
  try {
    const rawData = await moviedb.configuration()
    const data = {
      baseUrl : rawData.images.secure_base_url,
      imageSizes: rawData.images.poster_sizes,
    }
    res.json(data);
  } catch {
    res.status(501).send('Server error');
  }
});
/**
 * Movie Search endpoint
 */
app.get('/api/query', async (req, res) => {
  const query = String(req.query['query']) || '';
  const page = Number(req.query['page']) || 1;
  try {
    const rawData = await moviedb.searchMovie({ query, page });
    const data = rawData.results
      ?.map((e) => ({
        title: e.title,
        description: e.overview,
        rating: e.vote_average,
        imageURLEnd: e.poster_path || '',
      }))
      .filter((e) => e.imageURLEnd !== '');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(501).send('Server Error');
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
