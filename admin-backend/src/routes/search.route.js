import express from 'express';
import {search} from '../controllers/search/search';
import {protect} from "../middlewares/authentication/auth";
import upload from "../middlewares/fileUpload/upload";
const SearchRouter = express.Router();

SearchRouter.get('/search', search);
export default SearchRouter;
