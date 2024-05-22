"use strict";
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
exports.existingUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const bad_request_error_1 = require("../errors/bad-request-error");
const validate_request_1 = require("../middlewares/validate-request");
const router = express_1.default.Router();
exports.existingUserRouter = router;
router.post("/api/users/existinguser", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Must be an email id"),
    (0, express_validator_1.body)("username")
        .not()
        .isEmpty()
        .trim()
        .isLength({ min: 4, max: 12 })
        .withMessage("Username must be between 4 and 12 characters"),
], validate_request_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username } = req.body;
    const existingEmail = yield User_1.default.findOne({ email });
    if (existingEmail) {
        throw new bad_request_error_1.BadRequestError("Email Id already registered");
    }
    const existingUsername = yield User_1.default.findOne({ username });
    if (existingUsername) {
        throw new bad_request_error_1.BadRequestError("Username already taken");
    }
    return res.status(200).send({ uniqueUser: true });
}));
