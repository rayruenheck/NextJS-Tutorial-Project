import Image from "next/image";
import { unsplashImage } from "../../models/unsplash-image";
import Link from "next/link";
import type { Metadata } from "next";
import { Alert } from "@/components/bootstrap";

export const metadata: Metadata = {
    title: "Incremental Static Regeneration View Simple Image Gallery",
  };

  export const revalidate = 15

  export default async function StaticPage() {
    const res = await fetch(
      "https://api.unsplash.com/photos/random?client_id=" +
        process.env.UNSPLASH_ACCESS_KEY,
        {
            // or next: { revalidate: 15 *seconds* }
        }
    );
  
    const data: unsplashImage = await res.json();
  
    const width = Math.min(500, data.width);
  
    const height = (width / data.width) * data.height;
      
    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>This page <strong>fetches data dynamically.</strong> Every time you refresh this page, you get a new image from the Unsplash API</Alert>
            <Image
                src={data.urls.raw}
                width={width}
                height={height}
                alt={data.description}
                className="rounded shadow mw-100 h-100"
            />
      by <Link href={"/users/" + data.user.username}>{data.user.username}</Link>
        </div>
    )
    }