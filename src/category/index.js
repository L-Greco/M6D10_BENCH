import { Router } from "express";

import Model from "../utils/db/index.js";
const categories = Model.Categories
const categoriesRouter = Router()



categoriesRouter.get("/", async (req, res, next) => {
    try {
        const dbRes = await categories.findAll()
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})



categoriesRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = await categories.create(req.body);
        res.status(201).send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

categoriesRouter.delete("/:id", async (req, res, next) => {
    try {
        await categories.destroy({
            where: {
                author_id: req.params.id
            }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default categoriesRouter