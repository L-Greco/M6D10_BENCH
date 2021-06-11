import { Router } from "express";

import Model from "../utils/db/index.js";

const products = Model.Products
const comments = Model.Comments
const productsRouter = Router()



productsRouter.get("/", async (req, res, next) => {
    try {
        const dbRes = await products.findAll()
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})
productsRouter.get("/all", async (req, res, next) => {
    try {
        const dbRes = await products.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },
            // here in attributes we exclude theese values        
            include: [Model.Comments, Model.Categories],
            //  here i populate the comments 
            // and the Authors
            // this is why its an array , otherwise i would just type
            // include Model.Authors
            // { model: Model.Authors, attributes: { exclude: ["createdAt", "updatedAt"] } }
        }


        )
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

productsRouter.get("/:id", async (req, res, next) => {
    try {
        const dbResponse = await products.findByPk(req.params.id);
        res.send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

productsRouter.get("/:id/comments", async (req, res, next) => {
    try {
        const data = await comments.findAll({
            where: {
                productId: req.params.id
            },
            include: Model.Authors
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

productsRouter.put("/:id", async (req, res, next) => {
    try {
        await products.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(`Product with id : ${req.params.id} is successfully updated!`);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

productsRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = await products.create(req.body);
        res.status(201).send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

productsRouter.delete("/:id", async (req, res, next) => {
    try {
        await products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default productsRouter