"use client"
import SimpleImageSlider from "react-simple-image-slider";

export default function Simpleimagesliderclient({ photos }) {
    const transformedUrls = photos.map(url => {
        return `https://autoland-storage.s3.eu-central-1.amazonaws.com/${url}`
    })
    const imgs = transformedUrls.map(image => {
            return {url: image}
        }
    )
    return (
        <SimpleImageSlider className="w-full h-auto" width={1000} height={600} images={imgs} showNavs={true} showBullets={true} autoPlay={false}/>
    )
}