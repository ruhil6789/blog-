import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    sku: {
        type: String,
    },
    description: {
        type: String
    },
    product: {
        type: Number
    },
    inStock: {
        type: Number
    },
 
})
export default mongoose.model("inventory", inventorySchema)