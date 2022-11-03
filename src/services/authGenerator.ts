import { HydratedDocument } from "mongoose";
import User from "../models/User";
import { IUser } from "../types/modelsTypes";

export class AuthGenerator {
	private characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&()";

	GeneratePassword(lengthPassword: number) {
		let generatedPassword = "";

		const charactersLength = this.characters.length;

		for (let i = 0; i < lengthPassword; i++) {
			generatedPassword += this.characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return generatedPassword;
	}

	GenerateLogin(words: string) {
		let resultTranslit = "";

		type converterItems = {
			[key: string]: string;
		};
		
		const converter: converterItems = {
			"а": "a",    "б": "b",    "в": "v",    "г": "g",    "д": "d",
			"е": "e",    "ё": "e",    "ж": "zh",   "з": "z",    "и": "i",
			"й": "y",    "к": "k",    "л": "l",    "м": "m",    "н": "n",
			"о": "o",    "п": "p",    "р": "r",    "с": "s",    "т": "t",
			"у": "u",    "ф": "f",    "х": "h",    "ц": "c",    "ч": "ch",
			"ш": "sh",   "щ": "sch",  "ь": "",     "ы": "y",    "ъ": "",
			"э": "e",    "ю": "yu",   "я": "ya",
     
			"А": "A",    "Б": "B",    "В": "V",    "Г": "G",    "Д": "D",
			"Е": "E",    "Ё": "E",    "Ж": "Zh",   "З": "Z",    "И": "I",
			"Й": "Y",    "К": "K",    "Л": "L",    "М": "M",    "Н": "N",
			"О": "O",    "П": "P",    "Р": "R",    "С": "S",    "Т": "T",
			"У": "U",    "Ф": "F",    "Х": "H",    "Ц": "C",    "Ч": "Ch",
			"Ш": "Sh",   "Щ": "Sch",  "Ь": "",     "Ы": "Y",    "Ъ": "",
			"Э": "E",    "Ю": "Yu",   "Я": "Ya"
        };

		for (let i = 0; i < words.length; ++i) {
			if (converter[words[i]] === undefined) {
				resultTranslit += words[i];
			} else {
				resultTranslit += converter[words[i]];
			}
		}

		return this.separateName(resultTranslit);
	}

	private separateName(stringTranslit: string) {
		const arrayTranslit = stringTranslit.split(" ");

		let generatedUsername = "";
		for (let i = 0; i < arrayTranslit.length; i++) {
			if (i === 0) {
				generatedUsername += arrayTranslit[i];
			} else {
				generatedUsername += arrayTranslit[i].slice(0, 1);
			}
		}

		return this.correctLoginNumbers(generatedUsername);
	}

	private async correctLoginNumbers(login: string) {
		const loginNumbers = await this.getLastExistingLoginNumbers(login);
		let intNumbers = 0;

		if (parseInt(loginNumbers)) {
			intNumbers = parseInt(loginNumbers);
		}

		intNumbers += 1;

		const newLogin = login + intNumbers;

		return newLogin;
	}

	private async getLastExistingLoginNumbers(login: string) {
		const userDocs = await User.find({ username: { $regex: login } });
		const emptyNumbers = "";

		if (userDocs.length) {
			const lastLoginNumber = userDocs.pop() as HydratedDocument<IUser>;
			const username = lastLoginNumber?.username;

			for (let i = 0; i < username.length; i++) {
				const oneLetter = username[i];

				if (parseInt(oneLetter)) {
					return username.slice(i);
				}
			}

			return emptyNumbers;
		}

		return emptyNumbers;
	}
}

export default new AuthGenerator();
