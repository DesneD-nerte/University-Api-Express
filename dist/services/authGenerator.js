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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _AuthGenerator_characters;
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class AuthGenerator {
    static generatePassword(lengthPassword) {
        let generatedPassword = '';
        const charactersLength = __classPrivateFieldGet(this, _a, "f", _AuthGenerator_characters).length;
        for (let i = 0; i < lengthPassword; i++) {
            generatedPassword += __classPrivateFieldGet(this, _a, "f", _AuthGenerator_characters).charAt(Math.floor(Math.random() * charactersLength));
        }
        return generatedPassword;
    }
    static generateLogin(words) {
        const arrayName = words.split(' ');
        let resultTranslit = '';
        const converter = {
            '??': 'a', '??': 'b', '??': 'v', '??': 'g', '??': 'd',
            '??': 'e', '??': 'e', '??': 'zh', '??': 'z', '??': 'i',
            '??': 'y', '??': 'k', '??': 'l', '??': 'm', '??': 'n',
            '??': 'o', '??': 'p', '??': 'r', '??': 's', '??': 't',
            '??': 'u', '??': 'f', '??': 'h', '??': 'c', '??': 'ch',
            '??': 'sh', '??': 'sch', '??': '', '??': 'y', '??': '',
            '??': 'e', '??': 'yu', '??': 'ya',
            '??': 'A', '??': 'B', '??': 'V', '??': 'G', '??': 'D',
            '??': 'E', '??': 'E', '??': 'Zh', '??': 'Z', '??': 'I',
            '??': 'Y', '??': 'K', '??': 'L', '??': 'M', '??': 'N',
            '??': 'O', '??': 'P', '??': 'R', '??': 'S', '??': 'T',
            '??': 'U', '??': 'F', '??': 'H', '??': 'C', '??': 'Ch',
            '??': 'Sh', '??': 'Sch', '??': '', '??': 'Y', '??': '',
            '??': 'E', '??': 'Yu', '??': 'Ya'
        };
        for (var i = 0; i < words.length; ++i) {
            if (converter[words[i]] === undefined) {
                resultTranslit += words[i];
            }
            else {
                resultTranslit += converter[words[i]];
            }
        }
        return separateName(resultTranslit);
    }
}
exports.default = AuthGenerator;
_a = AuthGenerator;
_AuthGenerator_characters = { value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&()' };
function separateName(stringTranslit) {
    const arrayTranslit = stringTranslit.split(' ');
    let generatedUsername = '';
    for (let i = 0; i < arrayTranslit.length; i++) {
        if (i === 0) {
            generatedUsername += arrayTranslit[i];
        }
        else {
            generatedUsername += arrayTranslit[i].slice(0, 1);
        }
    }
    return correctLoginNumbers(generatedUsername);
}
function correctLoginNumbers(login) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginNumbers = yield getLastExistingLoginNumbers(login);
        let intNumbers = 0;
        if (Number.isInteger(parseInt(loginNumbers))) {
            intNumbers = parseInt(loginNumbers);
            console.log('intNumbers', intNumbers);
        }
        intNumbers += 1;
        const newLogin = login + intNumbers;
        console.log('newLogin', newLogin);
        return newLogin;
    });
}
function getLastExistingLoginNumbers(login) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDocs = yield User_1.default.find({ username: { $regex: login } });
        const emptyNumbers = '';
        console.log(userDocs);
        if (userDocs.length !== 0) {
            const lastLoginNumber = userDocs.pop();
            const { username } = lastLoginNumber;
            for (let i = 0; i < username.length; i++) {
                const oneLetter = username[i];
                console.log(oneLetter);
                if (Number.isInteger(parseInt(oneLetter))) {
                    console.log('qwe');
                    return username.slice(i);
                }
            }
            return emptyNumbers;
        }
        return emptyNumbers;
    });
}
