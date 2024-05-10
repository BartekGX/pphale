import {S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import sharp from "sharp"
import {getToken} from "next-auth/jwt";

export const dynamic = 'force-dynamic';
const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

async function uploadFileToS3(file, filename) {

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filename,
        Body: file,
        ContentType: "image/jpg"
    }
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return filename
}

export async function POST(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    try {
        let fileNames = []
        const data = await req.formData();
        const files = data.getAll("file");
        for (const file of files) {
            const extension = file.name.split('.').pop();
            const oldName = file.name.split('.')
            const newFileName = `${oldName[0]}-${Date.now()}.${extension}`;
            const buffer = Buffer.from(await file.arrayBuffer());
            const processedImage = await sharp(buffer)
                .resize(1920, 1080, {
                    fit: 'inside',
                    withoutEnlargement: true,
                    background: {
                        r: 0,
                        b: 0,
                        g: 0,
                        alpha: 255
                    }
                })
                .toFormat('jpg')
                .toBuffer();
            const fileName = await uploadFileToS3(processedImage, newFileName);
            fileNames.push(fileName)
        }
        if (!files) return NextResponse.json( { error: "File is required."}, { status: 400 })





        return NextResponse.json({ success: true, fileNames})
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Error uplading file"})
    }
}
export async function DELETE(req) {
    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    if (!session) {
        return NextResponse.json({error: "User is not authenticated"}, {status: 401})
    }
    const img = req.nextUrl.searchParams.get("img");
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: img
    }
    try {
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command)
        return NextResponse.json({message: "deleted"}, { status: 200 })
    } catch (e) {
        console.log("error", e)
        return NextResponse.json({ error: "error while deleting file"})
    }
}