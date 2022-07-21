import { HydratedDocument, Query } from 'mongoose';
import User from '../models/User';

export default class AuthGenerator {

    static #characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&()';

    static generatePassword(lengthPassword: Number) {
        let generatedPassword = '';

        const charactersLength = this.#characters.length;

        for (let i = 0; i < lengthPassword; i++) {
            generatedPassword += this.#characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return generatedPassword;
    }

    static generateLogin(words: string) {
        const arrayName = words.split(' ');
        
        let resultTranslit = '';

        type converterItems = {
            [key: string]: string
        };
        const converter: converterItems = {
            'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
            'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
            'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
            'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
            'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
            'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
            'э': 'e',    'ю': 'yu',   'я': 'ya',
     
            'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
            'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
            'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
            'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
            'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
            'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
            'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
        };
     
     
        for (var i = 0; i < words.length; ++i ) {
            if (converter[words[i]] === undefined){
                resultTranslit += words[i];
            } else {
                resultTranslit += converter[words[i]];
            }
        }

        return separateName(resultTranslit);
    }
}

function separateName (stringTranslit: string) {
    const arrayTranslit = stringTranslit.split(' ');

    let generatedUsername = '';
    for(let i = 0; i < arrayTranslit.length; i++) {
        if(i === 0) {
            generatedUsername += arrayTranslit[i];
        } else {
            generatedUsername += arrayTranslit[i].slice(0, 1)
        }
    }

    return correctLoginNumbers(generatedUsername)
}

async function correctLoginNumbers (login: string) {
    const loginNumbers = await getLastExistingLoginNumbers(login);
    let intNumbers: number = 0;

    if(Number.isInteger(parseInt(loginNumbers))) {
        intNumbers = parseInt(loginNumbers);
        console.log('intNumbers', intNumbers);
    }  

    intNumbers += 1;

    const newLogin = login + intNumbers;
    console.log('newLogin', newLogin);

    return newLogin;
}

async function getLastExistingLoginNumbers (login: string) {
    const userDocs = await User.find({username: {$regex: login}});
    const emptyNumbers = '';
    console.log(userDocs);
    if(userDocs.length !== 0) { 
        const lastLoginNumber = userDocs.pop();
        const {username} = lastLoginNumber; 

        for (let i = 0; i < username.length; i++) {
            const oneLetter = username[i];
            console.log(oneLetter);
            if(Number.isInteger(parseInt(oneLetter))) {
                console.log('qwe');
                return username.slice(i);
            }
        }
        
        return emptyNumbers;
    }

    return emptyNumbers;
}