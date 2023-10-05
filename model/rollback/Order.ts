import mongoose, { Document, Model, Schema } from "mongoose";

enum OrderStatus {
    Create = 'created',
    Processing = "processing",
    Shipped = 'Shipped',
    Cancelled = 'cancelled'
}

enum PaymentStatus {
    created = 'Created',
    Succeeded = 'Succeeded',
    Failed = 'Failed'
}

type OrderDocument = Document & {
    reference: string;
    status: OrderStatus;
    amount: number;
    val: number;
    user: mongoose.Types.ObjectId;
    payment: {
        reference: string;
        status: PaymentStatus;
        amount: number;
    },
    items: Array<{
        product: string;
        quantity: number;
        priceUnit: number;
    }>
}


type OrderInput = {
    reference: OrderDocument['reference'];
    status: OrderDocument['status'];
    amount: OrderDocument['amount'];
    val: OrderDocument['val'];
    user: OrderDocument['user'];
    payment: OrderDocument['payment'];
    items: OrderDocument['items'];
}


const paymentSchema = new Schema({
    reference: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: PaymentStatus,
        default: PaymentStatus.created
    }
}, {
    timestamps: true
})

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
    },
    quantity: {
        type: Schema.Types.Number,
        required: true,
    },
    priceUnit: {
        type: Schema.Types.Number,
        required: true,
    },
})

const orderSchema = new Schema({
    reference: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: OrderStatus,
        default: OrderStatus.Create
    },
    amount: {
        type: Schema.Types.Number,
        required: true
    },
    val: {
        type: Schema.Types.Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,

    },
    payment: {
        type: paymentSchema,
        required: true,
        index: true

    },
    items: {
        type: [orderItemSchema],
        required: true
    }
}, {
    collection: "orders",
    timestamps: true
});

export default mongoose.model('Orders', orderSchema)
// export default Model<userDocument> = mongoose.model('User', userSchema);

export { OrderDocument, OrderInput, OrderStatus, PaymentStatus };