export class Movie{
    id : number = -1;
    title : string = 'mock title';
    director : string = 'mock director';
    year : number = 2000;
    genre : string = 'mock genre';
    description : string = 'mock description';
    rating : number = 0.0;
    poster_url : string = 'mock poster';

    constructor(id : number, title : string, director : string, year : number, genre : string, description : string, rating : number, poster_url : string){
        this.id = id;
        this.title = title;
        this.director = director;
        this.year = year;
        this.genre = genre;
        this.description = description;
        this.rating = rating;
        this.poster_url = poster_url;
    }
}