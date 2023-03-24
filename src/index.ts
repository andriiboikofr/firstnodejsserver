import express, {Application,Request,Response} from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import "reflect-metadata";
import {DataSource} from "typeorm";
import dbConfig from "./config/database";

const PORT=process.env.PORT || 8000;

const app: Application =express();

app.use(express.json());
app.use(morgan("common"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
//createConnection(dbConfig)
app.use(Router);

const appDataSource=new DataSource(dbConfig)
appDataSource.initialize().then((_connection) => {
        app.listen(PORT,()=>{
            console.log("Server is running on port", PORT);
        });
    }).catch(
        (err)=>{
            console.log("Unable to connect to db", err);
            process.exit(1);
        });

        export default appDataSource;