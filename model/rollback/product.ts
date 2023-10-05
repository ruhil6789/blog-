import mongoose, { Document, Schema, Model } from "mongoose";

type ProductDocument = Document & {
    name: string;
    reference: string;
    inStock: number;
}

type ProductInput = {
    name: ProductDocument['name'];
    reference: ProductDocument['reference'];
    inStock: ProductDocument['inStock'];
}

const productSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    reference: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    inStock: {
        type: Schema.Types.Number,
        default: 0
    }
}, {
    collection: "products",
    timestamps: true
})

export default mongoose.model('Product', productSchema)
export { ProductDocument, ProductInput }