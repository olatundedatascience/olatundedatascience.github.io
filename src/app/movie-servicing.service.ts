import { Injectable } from '@angular/core';
import { MovieGenerator } from './movies';

@Injectable({
  providedIn: 'root'
})
export class MovieServicingService {
  private listOfMovie: Array<MovieGenerator>;
  constructor(movie: MovieGenerator) {
   // this.listOfMovie = movie.getMovies();

  }
}
