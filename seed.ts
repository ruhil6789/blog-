// import { User, UserInput } from "./models/user.model";
// import { Product, ProductInput } from "./models/product.model";
import user from "./model/rollback/user";
import product from "./model/rollback/product";
import { UserInput } from "./model/rollback/user";
import { ProductInput } from "./model/rollback/product";
const usersInput: UserInput[] = [
    {
        name: 'User First',
        email: 'user.first@email.com',
        bonusMark: 7,
    },
    {
        name: 'User Second',
        email: 'user.second@email.com',
        bonusMark: 5,
    }
];

const productInputs: ProductInput[] = [
    {
        name: 'Product One',
        inStock: 33,
        reference: 'PR0438MW2F',
    },
    {
        name: 'Product Two',
        inStock: 11,
        reference: 'PR1549NY3G',
    },
    {
        name: 'Product Three',
        inStock: 25,
        reference: 'PR2650OZ4H',
    },
];

export const seedDatabaseWithUsersAndProducts = async () => {
    const userPromises = usersInput.map(async (input) => {
        const users = await user.findOne({ email: input.email });

        if (users) {
            return;
        }

        await user.create([input]);
    });

    const productPromises = productInputs.map(async (input) => {
        const products = await product.findOne({ reference: input.reference });

        if (products) {
            return;
        }

        await product.create([input]);
    });

    await Promise.all(userPromises);
    await Promise.all(productPromises);
};


