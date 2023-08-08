import { unsplashImage } from "@/app/models/unsplash-image"
import Image from "next/image"
import styles from "./TopicsPage.module.css"
import { Alert } from "@/components/bootstrap"
import { Metadata } from "next"

interface PageProps {
    params: {topic: string},
    // searchParams : { [key:string]: string | string[] | undefined}
} 

//    export const dynamicParams = false

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
    
    return {
        title: topic  + " - NexJs 13.4 Image Gallery"
    }
}

   export function generateStaticParams(){
        return ['health','fitness', 'coding'].map(topic => ({topic}))
   }

export default async function Page({params: {topic}}: PageProps) {
   
    const res = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    const datas: unsplashImage[] = await res.json()
    
    return (
        <div>
            <Alert>This page uses <strong>generateStaticParams</strong> to render cache static pages at build time, even though the URL has a dynamic parameter. Pages that are not included in generateStaticParams will be fetched & rendered on first acces and then cached for subsequent requests (this can be disabled).</Alert>
            <h1>{topic}</h1>
            {
                datas.map(data => ( 
                    <Image
                        src={data.urls.raw}
                        width={250}
                        height={250}
                        alt={data.description}
                        key={data.urls.raw}
                        className={styles.image}
                    />
                ))
            }
       
        </div>
    )
}