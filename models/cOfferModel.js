import mongoose from "mongoose";


const cOfferSchema= new mongoose.Schema({
        reference: String,
        photo: String,
        name: String,
        price: Number,
        description: String,
        photos: [String],
        isPublic: { type: Boolean, default: false },
        position: Number,
    },
    {
        timestamps: true
    })
cOfferSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const cOffer = mongoose.models.cOffer || mongoose.model('cOffer', cOfferSchema)

export default cOffer;