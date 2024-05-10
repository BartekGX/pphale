"use client"

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Photodropzone from "@/components/photodropzone";
import Tiptap from "@/components/tiptap";
import {useEffect, useState} from "react";
import MoreInfoBox from "@/components/moreInfoBox";
import {useRouter} from "next/navigation";

export default function Dashboardeditbox({ _data }) {

    const [name, setName] = useState(_data.name)
    const [price, setPrice] = useState(_data.price)
    const [description, setDescription] = useState(_data.description);
    const [files, setFiles] = useState([])
    const [filesToDelete, setFilesToDelete] = useState([])
    const [oldFiles, setOldFiles] = useState(_data.photos)
    const [file, setFile] = useState([])
    const [oldFile, setOldFile] = useState(_data.photo)
    const router = useRouter()

    useEffect(() => {
        setPrice(prevState => {
            const stringPrice = `${prevState}`;
            return stringPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        });
    }, []);


    const sendFile = async (fileSF) => {
        const formData = new FormData()
        fileSF.forEach(file => {
            formData.append("file", file)
        })
        const res = await fetch("/api/s3-upload", {
            method: "POST",
            body: formData
        })
        if (!res.ok) {
            console.log("błąd wysyłania pliku")
            return ""
        }
        const resData = await res.json()
        return resData.fileNames
    }

    const imageDrop = async (imageFiles) => {
        if (imageFiles) {
            setFiles(files.concat(imageFiles))
        }
    }
    const mainImageDrop = async (imageFile) => {
        if (imageFile) {
            setFile(imageFile)
        }
    }
    const send = async () => {
        await deleteFiles()
        let photo = ""
        let photos = oldFiles
        if  (file.length > 0)
            photo = await sendFile(file)
        else photo = oldFile
        if (files.length > 0) {
            const newPhotos = await sendFile(files)
            photos = photos.concat(newPhotos)
        }
        const data= {
            photo: photo[0],
            name: name,
            price: parseInt(price.replace(/\s/g, '')) || 0,
            description: description,
            photos: photos
        }
        try {
            const res = await fetch(`/api/offer?id=${_data.id}`, {
                method: "PUT",
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw new Error(await res.text())
            }
            router.push("/dashboard")
        } catch (e) {
            console.log(e)
        }

    }
    const removeImage = (index) => {
        setFiles(prevState => {
            const newState = [...prevState]
            newState.splice(index, 1)
            return newState
        });
    }
    const removeOldImage = (index) => {
        setFilesToDelete(prevState => {
            const objectToAdd = oldFiles[index]
            return [...prevState, objectToAdd]
        })
        setOldFiles(prevState => {
            const newState = [...prevState]
            newState.splice(index, 1)
            return newState
        });
    }
    const deleteFiles = () => {
        let photoToDelete = []
        if (file.length > 0) {
            photoToDelete = oldFile
        }
        const toDelete = {
            photo: photoToDelete,
            photos: filesToDelete
        }
        if (photoToDelete.length + filesToDelete.length === 0) return
        try {
            const res = fetch(`/api/offer`, {
                method: "DELETE",
                body: JSON.stringify(toDelete)
            })
            if (!res.ok) {
                console.log("błąd usuwania zdjęć");
            }
        } catch (e) {
            console.log("błąd usuwania zdjęć")
        }
    }
    return (
        <div>
            <div className="border-b-2 py-3 px-2 flex justify-between items-center">
                <div>
                    <p className="text-xl">
                        Opcje
                    </p>
                </div>
                <div>
                    <Button onClick={send}>
                        Zapisz
                    </Button>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 p-2 gap-2 grid-cols-1">
                <div className="flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Główne zdjęcie
                            </CardTitle>
                            <div>
                                <div>
                                    <Photodropzone onImageDrop={(imageFile) => mainImageDrop(imageFile)}/>
                                </div>
                                <div className="mt-2">
                                    {file.length > 0 ? (
                                        <div
                                            className="flex justify-center items-center max-w-full max-h-[300px] object-contain overflow-hidden relative group"
                                            title="usuń zdjęcie" onClick={() => setFile([])}>
                                            <div
                                                className="absolute w-full h-full bg-black bg-opacity-40 text-red-400 flex justify-center items-center cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                     fill="currentColor" className="bi bi-x select-none"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                            <img src={URL.createObjectURL(file[0])} alt={file[0]}
                                                 className="object-contain select-none w-full max-h-[300px]"/>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex justify-center items-center max-w-full max-h-[300px] object-contain overflow-hidden relative">
                                            <img
                                                src={`https://autoland-storage.s3.eu-central-1.amazonaws.com/${oldFile}`}
                                                alt={oldFile}
                                                className="object-contain select-none w-full max-h-[300px]"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">
                                Dodatkowe zdjęcia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Photodropzone onImageDrop={(imageFile) => imageDrop(imageFile)} type="slider"/>
                            {files.length + oldFiles.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2 justify-center max-h-[300px] overflow-y-auto">
                                    <div
                                        className="border-2 rounded-lg overflow-hidden h-[100px] w-[100px] flex flex-wrap justify-center items-center text-center">
                                        razem {files.length + oldFiles.length} {files.length + oldFiles.length === 1 ? "zdjęcie" : files.length + oldFiles.length < 5 ? "zdjęcia" : files.length + oldFiles.length >= 5 && "zdjęć"}
                                    </div>
                                    {files.map((_file, index) => (
                                        <div key={_file.name + index} onClick={() => removeImage(index)}
                                             className="relative group border-2 rounded-lg overflow-hidden h-[100px] w-[100px] select-none">
                                            <div
                                                className="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-0 group-hover:bg-opacity-40 text-red-400 transition-all cursor-pointer select-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                     fill="currentColor" className="bi bi-x select-none"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <img src={URL.createObjectURL(_file)} alt={_file.name} width={100}
                                                     height={100} className="object-contain object-center select-none"/>
                                            </div>
                                        </div>
                                    ))}
                                    {oldFiles.map((_file, index) => (
                                        <div key={_file + index} onClick={() => removeOldImage(index)}
                                             className="relative group border-2 rounded-lg overflow-hidden h-[100px] w-[100px] select-none flex justify-center items-center">
                                            <div
                                                className="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-0 group-hover:bg-opacity-40 text-red-400 transition-all cursor-pointer select-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                     fill="currentColor" className="bi bi-x select-none"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src={`https://autoland-storage.s3.eu-central-1.amazonaws.com/${_file}`}
                                                    alt={_file.name} width={100}
                                                    height={100} className="object-contain object-center select-none"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="flex gap-2 w-full flex-col">
                    <Card className="p-3 md:w-auto sm:w-full mx-auto w-full">
                        <CardHeader>
                            <CardTitle
                                className="whitespace-nowrap text-center md:px-10 sm:px-5 px-3 md:text-2xl text-lg">
                                Podstatowe dane
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 w-full">
                                <div className="grid w-full w-full items-center gap-1.5">
                                    <Label htmlFor="nazwa">nazwa</Label>
                                    <Input
                                        type="text"
                                        id="nazwa"
                                        placeholder="nazwa"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="price">cena</Label>
                                        <div className="flex items-center gap-1">
                                            <Input
                                                type="text"
                                                id="price"
                                                placeholder="cena"
                                                value={price}
                                                onChange={(e) => {
                                                    let newPriceValue = e.target.value.replace(/\D/g, '');
                                                    newPriceValue = newPriceValue.replace(/\s/g, '');
                                                    newPriceValue = newPriceValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                                                    setPrice(newPriceValue);
                                                }}
                                                className="w-[100px]"
                                            />zł
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h2 className="md:text-lg text-md font-medium text-center">Opis</h2>
                                <Tiptap setTextState={setDescription} textState={description}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}