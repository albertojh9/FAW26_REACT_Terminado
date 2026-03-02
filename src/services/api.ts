"use strict";

import type { Dispatch, SetStateAction } from 'react';
// Cosas que pasar luego a environment:
import { URL_BACKEND } from './environment';
import { URL_BACKEND_DETAILS } from './environment';
import { Movie } from '../models/movie';

type MovieApi = {
    id: number;
    title: string;
    director: string;
    year: number;
    genre: string;
    description: string;
    rating: number;
    poster_url: string;
};

function toMovie(item: MovieApi): Movie {
    return new Movie(
        item.id,
        item.title,
        item.director,
        item.year,
        item.genre,
        item.description,
        item.rating,
        item.poster_url,
    );
}

export async function obtenerPeliculas(): Promise<Movie[]> {
    const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(URL_BACKEND, config);
    if (!response.ok) {
        throw new Error(`Error al obtener películas: ${response.status}`);
    }

    const datos = await response.json() as MovieApi[];
    return datos.map(toMovie);
}

export async function obtenerPelicula(id: number): Promise<Movie | null> {
    const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(URL_BACKEND_DETAILS + id, config);
    if (!response.ok) {
        throw new Error(`Error al obtener película: ${response.status}`);
    }

    const datos = await response.json() as MovieApi;
    return datos ? toMovie(datos) : null;
}

export async function recogerPeliculas(setMovies : Dispatch<SetStateAction<Movie[]>>) {
    try {
        const movies = await obtenerPeliculas();
        setMovies(movies);
    } catch (err) {
        console.error("Error fetch:", err);
    }
}

export async function recogerPelicula(setMovie : Dispatch<SetStateAction<Movie | null>>, id : number){
    try {
        const movie = await obtenerPelicula(id);
        setMovie(movie);
    } catch (err) {
        console.error("Error fetch:", err);
    }
}