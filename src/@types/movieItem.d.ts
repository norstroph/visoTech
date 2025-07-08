export type Movie = {
    "adult": boolean,
    "backdrop_path": string
    "genre_ids": number[]
    "id": number,
    "original_language": string
    "original_title": string
    "overview": string
    "popularity": number
    "poster_path": string
    "release_date": string
    "title": string
    "video": boolean,
    "vote_average": number
    "vote_count": number
    "runtime": number
    "tagline": string
    "homepage": string
    "status": string
    "revenue": number
    "budget": number
    "imdb_id": string
    "production_companies": []
    "production_countries": []
    "spoken_languages": []
    "genres":[]
}

export type MovieApiResponse = {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}