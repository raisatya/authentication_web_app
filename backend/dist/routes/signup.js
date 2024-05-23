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
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const validate_request_1 = require("../middlewares/validate-request");
const bad_request_error_1 = require("../errors/bad-request-error");
const router = express_1.default.Router();
exports.signupRouter = router;
router.post("/api/users/signup", [
    (0, express_validator_1.body)("fullname").not().isEmpty().withMessage("Full name must not be empty"),
    (0, express_validator_1.body)("username")
        .not()
        .isEmpty()
        .trim()
        .isLength({ min: 4, max: 12 })
        .withMessage("Username must not be empty"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Must be an email id"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
], validate_request_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, fullname } = req.body;
    const existingUser = yield User_1.default.findOne({
        $or: [
            {
                username,
            },
            {
                email,
            },
        ],
    });
    if (existingUser) {
        throw new bad_request_error_1.BadRequestError("Username already taken");
    }
    const newUser = yield User_1.default.create({
        email,
        username,
        password,
        fullname,
    });
    const userJwt = jwt.sign({
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        fullname: newUser.fullname,
    }, process.env.JWT_SECRET);
    res.cookie("currentUser", { jwt: userJwt }, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });
    res.status(201).send(newUser);
}));
