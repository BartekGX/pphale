import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Moreinfocard({ data, setInfo, index, onUpdate }) {
    const [newName, setNewName] = useState(data.name);
    const [newValue, setNewValue] = useState(data.value);

    useEffect(() => {
        onUpdate(index, newName, newValue);
    }, [newName, newValue]);

    const handleRemove = () => {
        setInfo(prevItems => {
            return prevItems.filter((item, i) => i !== index);
        });
    };

    return (
        <div className="flex gap-2">
            <Input type="text" value={newName} placeholder="nazwa" onChange={e => setNewName(e.target.value)} />
            <Input type="text" value={newValue} placeholder="wartość" onChange={e => setNewValue(e.target.value)} />
            <Button variant="outline" size="icon" onClick={handleRemove}>
                Usuń
            </Button>
        </div>
    );
}