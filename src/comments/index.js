import { Router } from "express";

import Model from "../utils/db/index.js";
const comments = Model.Comments
const commentsRouter = Router()



commentsRouter.get("/", async (req, res, next) => {
    try {
        const dbRes = await comments.findAll()
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})




commentsRouter.put("/:id", async (req, res, next) => {
    try {
        await comments.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(`Comment with id : ${req.params.id} is successfully updated!`);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

commentsRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = await comments.create(req.body);
        res.status(201).send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

commentsRouter.delete("/:id", async (req, res, next) => {
    try {
        await comments.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default commentsRouter