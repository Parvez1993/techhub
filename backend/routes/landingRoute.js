import { addLanding, getLanding } from "../controller/LandingController.js";
import express from "express";

const landingRouter = express.Router();

landingRouter.route("/").post(addLanding);
landingRouter.route("/").get(getLanding);

export default landingRouter;
