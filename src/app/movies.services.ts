import { MovieGenerator } from './movies';

export class MovieServices {
  private moviegenerator;
  constructor(services: MovieGenerator) {
    this.moviegenerator = services.getMovies();
  }

  getAllMovies() {
    this.moviegenerator.generate(10);
    return this.moviegenerator.getMovies();
  }
}
