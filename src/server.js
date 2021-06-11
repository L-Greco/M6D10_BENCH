import express from "express";
import db from "./utils/db/index.js"
import authorsRouter from "./authors/index.js";
import productsRouter from "./products/index.js";
import categoriesRouter from "./category/index.js";
import commentsRouter from "./comments/index.js"
import cors from "cors"

const { PORT } = process.env

const server = express()





server.use(express.json())
server.use(cors())

server.use("/authors", authorsRouter)
server.use("/products", productsRouter)
server.use("/comments", commentsRouter)
server.use("/categories", categoriesRouter)

db.sequelize
    .sync() // by saying force:true we say drop the previous table and create a new one if the table is changed
    .then(() => {    // actually it drops all tables after every change  in our code !! its a timebomb!
        server.listen(PORT, () => console.log("server is listening on Port: " + PORT));
        server.on("error", (error) =>
            console.info(" ❌ Server is not running due to : ", error),

        );
    })
    .catch((e) => {
        console.log(e);
    });

    // User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
    // User.sync({ force: true }) - This creates the table, dropping it first if it already existed
    // User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
