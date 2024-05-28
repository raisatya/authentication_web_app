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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const signup_1 = require("./routes/signup");
const signin_1 = require("./routes/signin");
const signout_1 = require("./routes/signout");
const current_user_1 = require("./routes/current-user");
const error_handler_1 = require("./middlewares/error-handler");
const not_found_error_1 = require("./errors/not-found-error");
const existing_user_1 = require("./routes/existing-user");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"];
const allowedOrigins = process.env.NODE_ENV == "production" ? prodOrigins : devOrigin;
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (process.env.NODE_ENV === "production") {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error(`${origin} not allowed by cors`));
            }
        }
        else {
            callback(null, true);
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(signup_1.signupRouter);
app.use(signin_1.signinRouter);
app.use(signout_1.signoutRouter);
app.use(current_user_1.currentUserRouter);
app.use(existing_user_1.existingUserRouter);
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new not_found_error_1.NotFoundError();
}));
app.use(error_handler_1.errorHandler);
