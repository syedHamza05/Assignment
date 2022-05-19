const joi = require("joi");
const Handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { SERVER } = require("../config/environment");
const { LANGUAGE_TYPE } = require("../constant/constant");
const { codes } = require("../codes/status_codes");
const langs = require("../langs");
const { messages } = require("../messages/messages");

const sendResponse = async(req, res, code, message, data) => {
    try {
        const lang =
            req.headers["content-language"] || LANGUAGE_TYPE.ENGLISH;
        return res.status(200).send({
            statusCode: code || codes.SUCCESS,
            message: langs[lang][message || messages.SUCCESS],
            data: data || {},
        });
    } catch (error) {
        throw error;
    }
};

const sendErrorResponse = async(req, res, code, error) => {
    try {
        const lang =
            req.headers["content-language"] || LANGUAGE_TYPE.ENGLISH;
        code =code || codes.BAD_REQUEST;
        return res.status(code).send({
            statusCode: code ,
            error: error,
            message: langs[lang][error] || error,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const unauthorizedResponse = async(req, res, message) => {
    try {
        const lang =
            req.headers["content-language"] || LANGUAGE_TYPE.ENGLISH;
        const code = codes.UNAUTHORIZED;
        message = message || messages.UNAUTHORIZED;
        return res.status(code).send({
            statusCode: code,
            message: langs[lang][message],
            data: {},
        });
    } catch (error) {
        throw error;
    }
};

const forBiddenResponse = async(req, res, message) => {
    try {
        const lang =
            req.headers["content-language"] || LANGUAGE_TYPE.ENGLISH;
        return res.status(208).send({
            statusCode: codes.FORBIDDEN,
            message: langs[lang][message || messages.FORBIDDEN],
            data: {},
        });
    } catch (error) {
        throw error;
    }
};

const validateSchema = async(inputs, schema) => {
    try {
        const { error, value } = joi.validate(inputs, schema);
        if (error) throw (error.details ? error.details[0].message : "");
        else return false;
    } catch (error) {
        throw error;
    }
};

const renderMessage = async(templateData, variablesData) => {
    return Handlebars.compile(templateData)(variablesData);
};

const generateNumber = async() => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const filterSpacesFromArray = async(arr) => {
    return arr.filter((item) => {
        return item && /\S/.test(item);
    });
};

const makeUniqueArray = async(array) => {
    if (Array.isArray(array)) {
        return [...new Set(array)];
    }
    return array;
};
const removeSpaces = async(value) => {
    if (!value) {
        return value;
    }
    return value.toString().replace(/\s/g, "");
};

const removeNewLineCharacters = async(value) => {
    if (!value) {
        return value;
    }
    return value.toString().replace(/\n|\r/g, "");
};

const dynamicPrecision = async(value, precision) => {
    precision = precision || 2;
    let float_val = parseFloat(value);
    if (isNaN(float_val)) {
        return value;
    }
    return +float_val.toFixed(precision);
};

const addDecimalPrecisionPoint = (apiReference, precision, value) => {
    if (value == null || precision <= 0) {
        return value;
    }
    let values = parseFloat(value);
    return values.toFixed(precision);
};

const convertArrayToObject = async(array) => {
    let arrayLength = array.length;
    let returnObj = {};
    for (let count = 0; count < arrayLength; count++) {
        returnObj[array[count]] = array[count];
    }
    return returnObj;
};

const addingSecurePrefixToURL = async(domainURL) => {
    if (domainURL.indexOf("https://") < 0 && domainURL.indexOf("http://") < 0) {
        domainURL = "https://" + domainURL;
    }
    return domainURL;
};

const addingPrefixToURL = async(domainURL) => {
    if (domainURL.indexOf("https://") < 0 && domainURL.indexOf("http://") < 0) {
        domainURL = "http://" + domainURL;
    }
    return domainURL;
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const jwtSign = async (payload) => {
    try {
      return jwt.sign(payload ,SERVER.JWT.SECRET, {
        expiresIn: eval(SERVER.JWT.EXPIRESIN*1000),
      });
    } catch (error) {
      throw error;
    }
};
  
const jwtVerify = async (token) => {
    try {
      return jwt.verify(token,SERVER.JWT.SECRET);
    } catch (error) {
      throw error;
    }
};
  
const jwtDecode = async (token) => {
    try {
      return jwt.decode(token, { complete: true });
    } catch (error) {
      throw error;
    }
};
  
const hashPasswordUsingBcrypt = async (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
};
  
const comparePasswordUsingBcrypt = async (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
};
const readFile=async(filePath)=>{
    return fs.readFileSync(path.join(process.cwd())+"/views/"+filePath, 'utf8');
}
const randomString=async(len)=>{
    len=len || 20;
    return crypto.randomBytes(20).toString('hex')+"-"+(new Date()).getTime();
}
const dateDifference=async(startDate,endDate)=>{
    return (endDate.getTime() - startDate.getTime())
}
module.exports = {
    forBiddenResponse,
    renderMessage,
    sendErrorResponse,
    sendResponse,
    unauthorizedResponse,
    validateSchema,
    generateNumber,
    randomString,
    filterSpacesFromArray,
    makeUniqueArray,
    removeSpaces,
    removeNewLineCharacters,
    dynamicPrecision,
    addDecimalPrecisionPoint,
    convertArrayToObject,
    addingSecurePrefixToURL,
    addingPrefixToURL,
    delay,
    jwtSign,
    jwtVerify,
    jwtDecode,
    hashPasswordUsingBcrypt,
    comparePasswordUsingBcrypt,
    readFile,
    dateDifference
};