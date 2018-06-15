export interface Book {
    author: string;
    title: string;
    genre: string;
    thumbnail: string;
    isbn: string;
    description: string;
}



export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    imageLinks: ImageLinks;
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
}

export interface GoogleBook {
    volumeInfo: VolumeInfo;
}

export interface GoogleBooksApiResult {
    kind: string;
    totalItems: number;
    items: GoogleBook[];
}
