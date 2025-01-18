"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Link from "next/link";

function page() {
	const [data, setData] = useState([]);
	const [isFetched, setIsFetched] = useState(false);
    const [saving, setSaving] = useState(false);
    const router = useRouter()
	const getData = async () => {
		try {
			const res = await fetch(`/api/offer`, {
				method: "GET",
				cache: "no-store",
			});
			if (!res.ok) {
				console.log("Błąd pobierania danych");
				return false;
			}
			const _data = await res.json();
			setIsFetched(true);
			setData(_data);
			console.log(_data);
		} catch (e) {
			console.log(e);
			return false;
		}
	};
	useEffect(() => {
		getData();
	}, []);

	const updateOrder = async (updatedData) => {
		try {
			const res = await fetch(`/api/offer/order`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedData),
			});
			if (!res.ok) {
				console.log("Błąd aktualizowania danych");
				return false;
			}
			const responseData = await res.json();
			console.log(responseData);
            router.push("/dashboard")
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	};

	const createReferencePosition = (data) => {
		return data.map((item, index) => ({
			reference: item.reference,
			position: index,
		}));
	};
	const saveOrder = async () => {
		console.log(createReferencePosition(data));
        setSaving(true)
		await updateOrder(createReferencePosition(data));
        setSaving(false)
	};
	return (
		<div>
			<div className="border-b-2 py-3 px-2 flex justify-between items-center">
				<div>
					<p className="text-xl">Opcje</p>
				</div>
				<div className="flex gap-2 ">
					<Button asChild>
						<Link href="/dashboard">Powrót</Link>
					</Button>
					<Button asChild onClick={saveOrder} disabled={saving}>
						<p className="cursor-pointer">{saving ? "Zapisywanie..." : "Zapisz"}</p>
					</Button>
				</div>
			</div>
            <div className="mb-3">
                <h3 className="text-center text-2xl font-medium border border-t-0 max-w-3xl rounded-b-lg w-full mx-auto p-2 text-neutral-200">Kolejność ogłoszeń</h3>
            </div>
			<div className="max-w-3xl w-full mx-auto my-5">
				<Reorder.Group
					axis="y"
					values={data}
					onReorder={setData}
					className="flex flex-col gap-2">
					{data.map((item, index) => (
						<Reorder.Item
							key={item.reference}
							value={item}
							className="border border-neutral-600 rounded-lg p-2 gap-2 flex flex-col cursor-grab bg-black"
							whileDrag={{ scale: 1.05 }}>
							<div className="flex flex-row justify-between gap-2">
								<div className="flex gap-2 flex-row">
									<span className="font-bold text-xl">{index + 1}</span>
									<p className="font-medium">{item.name}</p>
								</div>
								<div className="flex flex-row">
									<p className="text-nowrap">
										{item.price.toLocaleString()} zł
									</p>
								</div>
							</div>

						</Reorder.Item>
					))}
				</Reorder.Group>
                {
                    isFetched ? (
                        !data ? (
                            <div className="text-center py-4">błąd pobierania postów</div>
                        ) : data.length === 0 ? (
                            <div className="text-center py-4">brak ogłoszeń</div>
                        ) : null
                    ) : (
                        <div className="text-center py-4">ładowanie...</div>
                    )
                }
			</div>
		</div>
	);
}

export default page;
