import express from "express";
import {  signgin, signup } from "../controllers/auth.controller.js";


const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);

export default route;
