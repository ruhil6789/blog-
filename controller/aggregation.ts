import inventory from "../model/inventory";
import scores from "../model/scores";
import { Response, Request } from "express";
import Joi from "joi";

class Aggregation {

    lookupEx = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const { item, price, quantity } = req.body
            // const schema = Joi.object({
            //     item: Joi.string().required(),
            //     price: Joi.number().required(),
            //     quantity: Joi.number().required()

            // })

            console.log(item, price, quantity, "quantity");

            if (!item || !price || !quantity) {
                return res.status(400).json({
                    msg: 'invalid credentials',
                    success: false
                })
            }
            const schema: any = scores?.find({ item })
            const { error } = schema.validate(req.body)
            if (error) {
                throw {
                    message: "cannot found",
                    status: true,

                }
            }

            const result: any = await scores?.insertMany([
                { "item": "almonds", "price": 12, "quantity": 2 },
                { "item": "pecans", "price": 20, "quantity": 1 },
                { "item": "hello", "price": 20000, "quantity": 1000 }
            ])
            console.log(result, "result");

            const inventRes = await inventory?.insertMany([
                { "sku": "almonds", "description": "product 1", "inStock": 120 },
                { "sku": "bread", "description": "product 2", "inStock": 80 },
                { "sku": "cashews", "description": "product 3", "inStock": 60 },
                { "sku": "pecans", "description": "product 4", "inStock": 70 },
                { "sku": null, "description": "Incomplete" },
                { "sku": "hello" }
            ])

            console.log(inventRes, "inventRes")

            const aggregateRes = await scores?.aggregate([
                {
                    $lookup: {
                        from: "inventory",
                        localField: "item",
                        foreignField: "sku",
                        as: "inventory_docs"
                    }
                }
            ])

            console.log(aggregateRes, "aggregateRes");


            const rest: any = await scores?.find({
                item: item,
                price: price,
                quantity: quantity
            })

            if (aggregateRes) {
                res.status(200).json({
                    success: true,
                    data: aggregateRes,
                    rest: rest
                })
            }



            //  lookup with an array

        } catch (error: any) {

            console.log(error)
            res.status(400).json({ success: false })
        }
    }

}

export default new Aggregation