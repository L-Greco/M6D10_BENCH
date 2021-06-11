import { Router } from "express";

import Model from "../utils/db/index.js";

const blogs = Model.Blogs
const comments = Model.Comments
const blogsRouter = Router()



blogsRouter.get("/", async (req, res, next) => {
    try {
        const dbRes = await blogs.findAll()
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})
blogsRouter.get("/all", async (req, res, next) => {
    try {
        const dbRes = await blogs.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "authorId", "categoryId"] },
            // here in attributes we exclude theese values        
            include: [{ model: Model.Authors, attributes: { exclude: ["createdAt", "updatedAt"] } }, Model.Comments, Model.Categories],
            //  here i populate the comments 
            // and the Authors
            // this is why its an array , otherwise i would just type
            // include Model.Authors

        }


        )
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.get("/:id", async (req, res, next) => {
    try {
        const dbResponse = await blogs.findByPk(req.params.id);
        res.send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.get("/:id/comments", async (req, res, next) => {
    try {
        const data = await comments.findAll({
            where: {
                blogId: req.params.id
            },
            include: Model.Authors
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.put("/:id", async (req, res, next) => {
    try {
        await blogs.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(`Blog with id : ${req.params.id} is successfully updated!`);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = await blogs.create(req.body);
        res.status(201).send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.delete("/:id", async (req, res, next) => {
    try {
        await blogs.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default blogsRouter