import { connectDB } from "../../../../../utils/connect";
import cOffer from "../../../../../models/cOfferModel";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function PUT(req) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	if (!session) {
		return NextResponse.json(
			{ error: "User is not authenticated" },
			{ status: 401 }
		);
	}
	try {
		const data = await req.json();
		await connectDB();
		for (const item of data) {
			// const existingOffer = await cOffer.findOne({ reference: item.reference });
			// if (!existingOffer) {
			// 	console.log(`Nie znaleziono oferty o reference: ${item.reference}`);
			// 	continue;
			// }

			await cOffer.findOneAndUpdate(
				{ reference: item.reference },
				{ position: item.position },
                // { new: true }
			);
			console.log(`Zaktualizowano ofertę: ${item.position}`);
		}
		// await Offer.findByIdAndUpdate(id, updatedData)
		return NextResponse.json(
			{ message: "Dane zostały zaktualizowane" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("error", error);
		res
			.status(500)
			.json({ message: "Wystąpił błąd podczas aktualizacji danych" });
	}
}
