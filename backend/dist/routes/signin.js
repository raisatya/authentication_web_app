"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middlewares/validate-request");
const User_1 = __importDefault(require("../models/User"));
const Password_1 = require("../services/Password");
const bad_request_error_1 = require("../errors/bad-request-error");
const router = express_1.default.Router();
exports.signinRouter = router;
router.post("/api/users/signin", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Must be an email"),
    (0, express_validator_1.body)("password").not().isEmpty().withMessage("Password must not be empty"),
], validate_request_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield User_1.default.findOne({ email });
    if (!existingUser) {
        throw new bad_request_error_1.BadRequestError("User not found");
    }
    const passwordsMatch = yield Password_1.Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new bad_request_error_1.BadRequestError("Incorrect Password");
    }
    const userJwt = jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        fullname: existingUser.fullname,
    }, process.env.JWT_SECRET);
    res.cookie("currentUser", { jwt: userJwt }, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
        sameSite: 'lax'
    });
    //_vercel_jwt
    res.status(201).send(existingUser);
}));
