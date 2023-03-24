import { DataSourceOptions } from "typeorm";
import {User, Post, Comment} from '../models';

const config: DataSourceOptions={
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postres",
    password: process.env.POSTGRESS_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "postgres",
    entities: [User, Post, Comment],
    synchronize: true,
    applicationName: "FirstBlog",
};

export default config;