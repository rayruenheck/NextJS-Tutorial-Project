export interface unsplashImage {
    description: string,
    user: {
        username:string
    },
    urls:{
        raw:string
    },
    width:number,
    height:number
}

export interface UnsplashSearchResponse {
    results: unsplashImage[]
}