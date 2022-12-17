import express from "express";
import cors from "cors";
import testDB from "./routes/testDB";
import { addKCPEPaper } from "./routes/addKCPEPaper";
import { uploadImgToS3 } from "./services/s3";
import { getSubjects } from "./routes/subjects";
import { getPaper, getPapers } from "./routes/papers";

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
// Express configuration
app.set("port", process.env.PORT || 4000);
app.set("host", "0.0.0.0");
/**
 * Primary API routes.
 */

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Welcome to Soma's Intelligent Prep API!");
} );

app.post( "/addkcpepaper", ( req, res ) => {
    addKCPEPaper(req, res);
} );

app.post("/upload-image" , ( req, res ) => {
    uploadImgToS3(req, res);
} );

app.get( "/subjects", ( req, res ) => {
    getSubjects(res);
} );

app.get( "/subjects/:subject", ( req, res ) => {
    getPapers(req, res);
} );

app.get( "/paper/:title_year", ( req, res ) => {
    getPaper(req, res);
} );

app.get( "/testdb", ( req, res ) => {
    testDB(res);
} );

export default app;
