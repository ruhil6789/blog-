import mongoose,{ClientSession} from "mongoose";
import Order from "./model/rollback/Order";
import { OrderInput,OrderStatus,PaymentStatus } from "./model/rollback/Order";
import product from "./model/rollback/product";
import user from "./model/rollback/user";

const userId = '619052e09f31f6bcc5cf0234';

const orderInput: OrderInput = {
    amount: 50,
    val: 20,
    user: new mongoose.Types.ObjectId(userId),
    status: OrderStatus.Create,
    reference: Math.random().toString(),
    payment: {
        amount: 50,
        reference: Math.random().toString(),
        status: PaymentStatus.created,
    },
    items: [
        {
            product: '61903d0c3e658edce54265b6', // ID of "Product One" in the products collection
            priceUnit: 5,
            quantity: 4,
        },
        {
            product: '61903cdabe8df95babed6698', // ID of the "Product Two" in the products collection
            priceUnit: 10,
            quantity: 3,
        },
    ]
};


const proceedToPayment = async (paymentInput: OrderInput["payment"]) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Payment failed for unknown reason');
        }, 2000);
    })
};

export const processUserOrderFail = async () => {
    const session: ClientSession = await mongoose.startSession();

    session.startTransaction();

    try {
        // Step 1: create the order
        const [createdOrder] = await Order.create([orderInput], { session });

        // Step 2: process the payment
        const paymentResult: any = await proceedToPayment(orderInput?.payment);

        if (paymentResult.failed) {
            // Step 3: update the payment status
            await Order.updateOne({ reference: createdOrder.reference }, { 'payment.status': PaymentStatus.Failed}, { session });
        } else {
            // Step 3: update the payment status
            await Order.updateOne({ reference: createdOrder.reference }, { 'payment.status': PaymentStatus.Succeeded }, { session });

            // Step 4: Update the product quantity in stock
            await Promise.all(orderInput.items.map((item) => {
                product.findOneAndUpdate({ _id: item.product }, { $inc: { inStock: item.quantity * -1 } }, { new: true, session });
            }));

            // Step 5: Update bonus mark
            if (orderInput.payment.amount > 100) {
                await user.findOneAndUpdate({ _id: orderInput.user }, { $inc: { bonusMark: 5 } }, { new: true, session });
            }
        }

        // Commit the changes
        await session.commitTransaction();
    } catch (error) {
        // Rollback any changes made in the database
        await session.abortTransaction();

        // logging the error
        console.error(error);

        // Rethrow the error
        throw error;
    } finally {
        // Ending the session
        session.endSession();
    }
};
