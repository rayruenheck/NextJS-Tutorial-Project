import { UnsplashSearchResponse } from "@/app/models/unsplash-image"
import { NextResponse } from "next/server"

export async function GET(requst: Request) {
    const { searchParams } = new URL(requst.url)

    const query = searchParams.get('query')

    if(!query){
        return NextResponse.json({error: 'no query provided'},{status:400})

    }

    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)

    const { results }: UnsplashSearchResponse = await res.json()

    return NextResponse.json(results)

}