// import  RandomGenerator  from './plain';
// var RandomGenerator = require('./plain')
import { RandomGenerator } from './RandomNumberGen';
import { DatePipe } from '@angular/common';
class Movie {
  public inCenema = false;
  public CreatedAt: Date;
  constructor(
    private name,
    private id,
    private rate,
    private genre,
    private price,
    private guid,
    private inci,
    private description
  ) {
    this.name = name;
    this.id = id;
    this.guid = guid;
    this.rate = rate;
    this.genre = genre;
    this.price = price;
    this.inCenema = inci;
    this.description = description;
  }
}

export class MovieGenerator {
  private generateId;
  public fakeMovies: Array<Movie>;
  private movie: Movie;
  constructor() {
    this.generateId = new RandomGenerator();
    this.movie = null;
    this.fakeMovies = new Array<Movie>();
    //  this.rander = new RandomGenerator(10).generateId(10);
  }

  generate(size) {
    for (let i = 0; i < size; i++) {
      const name = 'name_' + i;
      const id = this.generateId.generateIdUpdate(14);
      const rate = 'rate_' + i;
      const price = 'price_' + i;
      const guid = this.generateId.generateIdUpdate(14);
      const genre = 'genre_' + i;
      const descript = '_ ' + i;
      this.movie = new Movie(name, id, rate, genre, price, guid, true, descript);
      this.movie.CreatedAt = new Date;
      if (i % 2 == 0) {
        this.movie.inCenema = true;
      }
      this.fakeMovies.push(this.movie);
    }
  }

  getMovies() {
    return this.fakeMovies;
  }

  insert(id, name, price, rate, ince, descr) {
    const nw = new Movie(name, id, rate, price, price, id, ince, descr);
    nw.CreatedAt = new Date;
    this.fakeMovies.push(nw);
  }

  display() {
    for (let i = 0; i < this.fakeMovies.length; i++) {
      console.log(this.fakeMovies[i]);
    }
  }
}

// module.exports = MovieGenerator;
