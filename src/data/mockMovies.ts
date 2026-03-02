// src/data/mockMovies.js

import { Movie } from "../models/movie";

export const mockMovies : Movie[] = [
    new Movie(
      1,
      "The Shawshank Redemption",
      "Frank Darabont",
      1994,
      "Drama",
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      9.3,
      "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    ),
  new Movie(
    2,
    "The Godfather",
    "Francis Ford Coppola",
    1972,
    "Crime",
    "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    9.2,
    "https://image.tmdb.org/t/p/original/3Tf8vXykYhzHdT0BtsYTp570JGQ.jpg"
  ),
  new Movie(
    3,
    "The Dark Knight",
    "Christopher Nolan",
    2008,
    "Action",
    "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    9.0,
    "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  ),
  new Movie(
    4,
    "Pulp Fiction",
    "Quentin Tarantino",
    1994,
    "Crime",
    "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    8.9,
    "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
  ),
  new Movie(
    5,
    "Forrest Gump",
    "Robert Zemeckis",
    1994,
    "Drama",
    "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    8.8,
    "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
  ),
  new Movie(
    6,
    "Inception",
    "Christopher Nolan",
    2010,
    "Science Fiction",
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    8.8,
    "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  ),
  new Movie(
    7,
    "The Matrix",
    "Lana Wachowski, Lilly Wachowski",
    1999,
    "Science Fiction",
    "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    8.7,
    "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  ),
  new Movie(
    8,
    "Goodfellas",
    "Martin Scorsese",
    1990,
    "Crime",
    "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    8.7,
    "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg"
  ),
  new Movie(
    9,
    "Interstellar",
    "Christopher Nolan",
    2014,
    "Science Fiction",
    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    8.6,
    "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  )
];

export default mockMovies;
