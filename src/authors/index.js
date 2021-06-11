import { Router } from "express";

import Model from "../utils/db/index.js";
const authors = Model.Authors
const authorsRouter = Router()



authorsRouter.get("/", async (req, res, next) => {
    try {
        const dbRes = await authors.findAll()
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

authorsRouter.get("/:id", async (req, res, next) => {
    try {
        const dbResponse = await authors.findByPk(req.params.id);
        res.send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


authorsRouter.put("/:id", async (req, res, next) => {
    try {
        await authors.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(`Author with id : ${req.params.id} is successfully updated!`);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

authorsRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = await authors.create(req.body);
        res.status(201).send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

authorsRouter.delete("/:id", async (req, res, next) => {
    try {
        await authors.destroy({
            where: {
                author_id: req.params.id
            }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default authorsRouter