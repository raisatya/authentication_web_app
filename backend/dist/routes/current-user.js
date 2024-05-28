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
exports.currentUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.currentUserRouter = router;
router.get('/api/users/currentuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.currentUser;
    if (!token || token.jwt === null)
        return res.send({ currentUser: null });
    try {
        const payload = jsonwebtoken_1.default.verify(token.jwt, process.env.JWT_SECRET);
        return res.send({ currentUser: payload });
    }
    catch (err) {
        console.log(err);
    }
}));
