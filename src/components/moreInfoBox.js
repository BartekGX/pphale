import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Moreinfocard from "@/components/moreinfocard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MoreInfoBox({ moreInfo, setMoreInfo }) {

    const addMoreInfo = () => {
        const demo = { name: "", value: "" };
        setMoreInfo(prevState => prevState.concat(demo));
    };

    const updateInfo = (index, newName, newValue) => {
        setMoreInfo(prevItems => {
            return prevItems.map((item, i) => {
                if (i === index) {
                    return { name: newName, value: newValue };
                }
                return item;
            });
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center">Dodatkowe informacje</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                {moreInfo.map((item, index) => (
                    <Moreinfocard key={index} data={item} setInfo={setMoreInfo} index={index} onUpdate={updateInfo} />
                ))}
                <Button onClick={addMoreInfo} className="w-full">
                    Dodaj informację
                </Button>
            </CardContent>
        </Card>
    );
}