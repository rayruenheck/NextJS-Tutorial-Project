"use client";

import { Button } from "react-bootstrap";

interface ErrorPageProps{
    error:Error,
    reset:()=> void
}
export default function Error({error, reset}: ErrorPageProps){
    return(
        <div>
            <h1>ERROR</h1>
            <p>something went wrong</p>
            <Button onClick={reset}>Try Again</Button>
        </div>

    )
}