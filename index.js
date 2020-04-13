'use strict';

const BigNumber = require('bignumber.js');
BigNumber.config({ DECIMAL_PLACES: 8 });

const
    HEX_CHARS = '0123456789ABCDEFabcdef',
    BASE56_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz',
    BASE58_CHARS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    BASE64_CHARS = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/=';

let isEnabled = true;
const activeExports = {};
const precon = module.exports = {

    /**
     * Value must be an array.
     *
     * @param val {*[]}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the array must be.
     * @returns {*[]} val
     */
    array: array,

    /**
     * Value must be an array or otherwise not set.
     *
     * @param val {*[]|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the array must be.
     * @returns {*[]|undefined|null} val
     */
    opt_array: opt_precon(array),

    /**
     * Value must be an array whose elements are a specific type of value.
     *
     * @param val {*[]}
     * @param type {string} The name of the type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]} val
     */
    arrayOf: arrayOf,

    /**
     * Value must be an array whose elements are a specific type of value or otherwise not set.
     *
     * @param val {*[]|undefined|null}
     * @param type {string} The name of the type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]|undefined|null} val
     */
    opt_arrayOf: opt_precon(arrayOf),

    /**
     * Value must be an array whose elements are an instance of a specific type.
     *
     * @param val {*[]}
     * @param instanceType {*} The instance type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]} val
     */
    arrayOfInstance: arrayOfInstance,

    /**
     * Value must be an array whose elements are an instance of a specific type or otherwise not set.
     *
     * @param val {*[]|undefined|null}
     * @param instanceType {*} The instance type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]|undefined|null} val
     */
    opt_arrayOfInstance: opt_precon(arrayOfInstance),

    /**
     * Value must be a string of base56 characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    base56: base56,

    /**
     * Value must be a string of base56 characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_base56: opt_precon(base56),

    /**
     * Value must be a string of base58 characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    base58: base58,

    /**
     * Value must be a string of base58 characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_base58: opt_precon(base58),

    /**
     * Value must be a string of base64 characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    base64: base64,

    /**
     * Value must be a string of base64 characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_base64: opt_precon(base64),

    /**
     * Value must be a boolean type.
     *
     * @param val {boolean}
     * @param [paramName] {string} The name of the parameter.
     * @returns {boolean} val
     */
    boolean: boolean,

    /**
     * Value must be a boolean type or otherwise not set.
     *
     * @param val {boolean|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {boolean|undefined|null} val
     */
    opt_boolean: opt_precon(boolean),

    /**
     * Value must a BigInt type.
     *
     * @param val {BigInt}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigInt} val
     */
    bigint: bigint,

    /**
     * Value must a BigInt type or otherwise not set.
     *
     * @param val {BigInt|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigInt|undefined|null} val
     */
    opt_bigint: opt_precon(bigint),

    /**
     * Value must be a bignumber.js type.
     *
     * @param val {BigNumber}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber} val
     */
    bigNumberJS: bigNumberJS,

    /**
     * Value must be a bignumber.js type or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null} val
     */
    opt_bigNumberJS: opt_precon(bigNumberJS),

    /**
     * Value must be a Buffer type.
     *
     * @param val {Buffer}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the Buffer must be.
     * @returns {Buffer}
     */
    buffer: buffer,

    /**
     * Value must be a Buffer type or otherwise not set.
     *
     * @param val {Buffer|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the Buffer must be.
     * @returns {Buffer|undefined|null}
     */
    opt_buffer: opt_precon(buffer),

    /**
     * Value must be any type other than "undefined".
     *
     * @param val {*}
     * @param [paramName] {string} The name of the parameter.
     * @returns {*} val
     */
    defined: defined,

    /**
     * Value must be a function.
     *
     * @param val {function}
     * @param [paramName] {string} The name of the parameter.
     * @returns {function} val
     */
    funct: funct,

    /**
     * Value must be a function or otherwise not set.
     *
     * @param val {function|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {function|undefined|null} val
     */
    opt_funct: opt_precon(funct),

    /**
     * Value must be a string of hexadecimal characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    hex: hex,

    /**
     * Value must be a string of hexadecimal characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_hex: opt_precon(hex),

    /**
     * Value must be an instance of a specific type.
     *
     * @param val {*}
     * @param instanceType {*} The type of instance.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*} val
     */
    instanceOf: instanceOf,

    /**
     * Value must be an instance of a specific type or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param instanceType {*} The type of instance.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null} val
     */
    opt_instanceOf: opt_precon(instanceOf),

    /**
     * Value must be a number type with no decimal places.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    integer: integer,

    /**
     * Value must be a number type with no decimal places or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_integer: opt_precon(integer),

    /**
     * Value must be a Map.
     *
     * @param val {Map}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Map} val
     */
    map: map,

    /**
     * Value must be a Map or otherwise not set.
     *
     * @param val {Map|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Map|undefined|null} val
     */
    opt_map: opt_precon(map),

    /**
     * Value must be a bignumber.js type and the value must be between specified min and max values.
     *
     * @param val {BigNumber}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber} val
     */
    minMaxBigNumberJS: minMaxBigNumberJS,

    /**
     * Value must be a bignumber.js type and the value must be between specified min and max values or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null} val
     */
    opt_minMaxBigNumberJS: opt_precon(minMaxBigNumberJS),

    /**
     * Value must be a number type with no decimal places and must be between specified min and max values.
     *
     * @param val {number}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    minMaxInteger: minMaxInteger,

    /**
     * Value must be a number type with no decimal places and must be between specified min and max values or
     * otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_minMaxInteger: opt_precon(minMaxInteger),

    /**
     * Value must be a number type with a value between the specified min and max values.
     *
     * @param val {number}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    minMaxNumber: minMaxNumber,

    /**
     * Value must be a number type with a value between the specified min and max values or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_minMaxNumber: opt_precon(minMaxNumber),

    /**
     * Value must be bignumber.js type with a value less than or equal to 0.
     *
     * @param val {BigNumber}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber} val
     */
    negativeBigNumberJS: negativeBigNumberJS,

    /**
     * Value must be bignumber.js type with a value less than or equal to 0 or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null} val
     */
    opt_negativeBigNumberJS: opt_precon(negativeBigNumberJS),

    /**
     * Value must be a number type with no decimal places and a value less than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    negativeInteger: negativeInteger,

    /**
     * Value must be a number type with no decimal places and a value less than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_negativeInteger: opt_precon(negativeInteger),

    /**
     * Value must be a number type with a value less than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    negativeNumber: negativeNumber,

    /**
     * Value must be a number type with a value less than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_negativeNumber: opt_precon(negativeNumber),

    /**
     * Value cannot be null or undefined.
     *
     * @param val {*}
     * @param [paramName] {string} The name of the parameter.
     * @returns {*} val
     */
    notNull: notNull,

    /**
     * Value must be a number type.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number}
     */
    number: number,

    /**
     * Value must be a number type or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null}
     */
    opt_number: opt_precon(number),

    /**
     * Value must be an object type.
     *
     * @param val {object}
     * @param [paramName] {string} The name of the parameter.
     * @returns {object}
     */
    obj: obj,

    /**
     * Value must be an object type or otherwise not set.
     *
     * @param val {object|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {object|undefined|null}
     */
    opt_obj: opt_precon(obj),

    /**
     * Value must be one of the specified values.
     *
     * @param val {*}
     * @param optionsArr {*[]}
     * @param [paramName] {string} The name of the parameter.
     * @returns {*}
     */
    oneOf: oneOf,

    /**
     * Value must be one of the specified values or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param optionsArr {*[]} Array of valid values.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null}
     */
    opt_oneOf: opt_precon(oneOf),

    /**
     * Value must be an instance of one of the specified instance types.
     *
     * @param val {*}
     * @param instanceTypeArr {*[]} Array of valid instance types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*}
     */
    oneOfInstance: oneOfInstance,

    /**
     * Value must be an instance of one of the specified instance types or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param instanceTypeArr {*[]} Array of valid instance types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null}
     */
    opt_oneOfInstance: opt_precon(oneOfInstance),

    /**
     * Value must be one of the specified value types.
     *
     * @param val {*}
     * @param typeArr {string[]} Array of valid value types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*}
     */
    oneOfType: oneOfType,

    /**
     * Value must be one of the specified value types or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param typeArr {string[]} Array of valid value types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null}
     */
    opt_oneOfType: opt_precon(oneOfType),

    /**
     * Value must be a bignumber.js type with a value greater than or equal to 0.
     *
     * @param val {BigNumber}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber}
     */
    positiveBigNumberJS: positiveBigNumberJS,

    /**
     * Value must be a bignumber.js type with a value greater than or equal to 0 or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null}
     */
    opt_positiveBigNumberJS: opt_precon(positiveBigNumberJS),


    /**
     * Value must be a number type with no decimal places and a value greater than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number}
     */
    positiveInteger: positiveInteger,

    /**
     * Value must be a number type with no decimal places and a value greater than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null}
     */
    opt_positiveInteger: opt_precon(positiveInteger),

    /**
     * Value must be a number type with a value greater than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number}
     */
    positiveNumber: positiveNumber,

    /**
     * Value must be a number type with a value greater than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null}
     */
    opt_positiveNumber: opt_precon(positiveNumber),

    /**
     * Value must be a Set.
     *
     * @param val {Set}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Set}
     */
    set: set,

    /**
     * Value must be a Set or otherwise not set.
     *
     * @param val {Set|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Set|undefined|null}
     */
    opt_set: opt_precon(set),

    /**
     * Value must be a string.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string}
     */
    string: string,

    /**
     * Value must be a string or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null}
     */
    opt_string: opt_precon(string),

    /**
     * Value must not be defined at all.
     *
     * @param val {undefined}
     * @param [paramName] {string} The name of the parameter.
     */
    undef: undef
};

class PreconError extends Error {
    constructor(message) {
        super(message);
    }
}

Object.defineProperties(precon, {
    enabled: {
        get: () => { return isEnabled; },
        set: val => {
            isEnabled = !!val;
            _updateEnabled();
        }
    },
    PreconError: {
        value: PreconError
    }
});

// Archive functions so that they can be swapped in and out of the exported object as precon is enabled and disabled.
Object.keys(precon).forEach(funcName => {
    activeExports[funcName] = precon[funcName];
});

_updateEnabled();


function _updateEnabled() {
    Object.keys(activeExports).forEach(funcName => {
        precon[funcName] = isEnabled ? activeExports[funcName] : inactivePrecon;
    });
}


function inactivePrecon(obj) {
    return obj;
}


function opt_precon(preconFunct) {
    return function(...args) {
        if (args[0] === null || typeof args[0] === 'undefined')
            return args[0];

        return preconFunct(...args);
    }
}


function array(val, paramName, length) {

    if (typeof paramName === 'number') {
        length = paramName;
        paramName = null;
    }

    if (!Array.isArray(val))
        throw new PreconError(`${paramName || 'Argument'} must be an array. Type is "${typeof(val)}" and value is: ${val}`);

    if (typeof length === 'number' && val.length !== length)
        throw new PreconError(`${paramName || 'Argument'} array must contain ${length} elements. Has ${val.length} elements.`);

    return val;
}


function arrayOf(val, type, paramName) {
    if (typeof type !== 'string')
        throw new Error('type is expected to be a string');

    array(val, paramName);

    val.forEach(item => {
        if (typeof item !== type)
            throw new PreconError(`${paramName || 'Argument'} must be an array of "${type}". Contains "${typeof(val)}"`);
    });

    return val;
}


function arrayOfInstance(val, instanceType, paramName) {
    array(val, paramName);

    val.forEach(item => {
        if (!(item instanceof instanceType))
            throw new PreconError(`${paramName || 'Argument'} must be an array of "${instanceType.name}". Contains "${val.constructor.name}"`);
    });

    return val;
}


function base56(val, paramName) {
    if (typeof val !== 'string')
        throw new PreconError(`${paramName || 'Argument'} must be a base56 string. Type is "${typeof(val)}" and value is: ${val}`);

    for (let i = 0; i < val.length; i++) {
        if (BASE56_CHARS.indexOf(val.charAt(i)) === -1)
            throw new PreconError(`${paramName || 'Argument'} must be a base56 string. Value is: ${val}`);
    }

    return val;
}


function base58(val, paramName) {
    if (typeof val !== 'string')
        throw new PreconError(`${paramName || 'Argument'} must be a base58 string. Type is "${typeof(val)}" and value is: ${val}`);

    for (let i = 0; i < val.length; i++) {
        if (BASE58_CHARS.indexOf(val.charAt(i)) === -1)
            throw new PreconError(`${paramName || 'Argument'} must be a base58 string. Value is: ${val}`);
    }

    return val;
}


function base64(val, paramName) {
    if (typeof val !== 'string')
        throw new PreconError(`${paramName || 'Argument'} must be a base64 string. Type is "${typeof(val)}" and value is: ${val}`);

    if (val.length % 2 !== 0)
        throw new PreconError(`${paramName || 'Argument'} must be a hex string. Odd number of characters in value. Value is: ${val}`);

    for (let i = 0; i < val.length; i++) {
        if (BASE64_CHARS.indexOf(val.charAt(i)) === -1)
            throw new PreconError(`${paramName || 'Argument'} must be a base64 string. Value is: ${val}`);
    }

    return val;
}


function boolean(val, paramName) {
    if (typeof val !== 'boolean')
        throw new PreconError(`${paramName || 'Argument'} must be boolean type. Type is "${typeof(val)}" and value is: ${val}`);

    return val
}


function bigint(val, paramName) {
    if (typeof val !== 'bigint')
        throw new PreconError(`${paramName || 'Argument'} must be BigInt type. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function bigNumberJS(val, paramName) {
    if (!BigNumber.isBigNumber(val) || val.isNaN())
        throw new PreconError(`${paramName || 'Argument'} must be BigNumber type. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function buffer(val, paramName, length) {

    if (typeof paramName === 'number') {
        length = paramName;
        paramName = null;
    }

    if (!Buffer.isBuffer(val))
        throw new PreconError(`${paramName || 'Argument'} must be a Buffer. Type is "${typeof(val)}" and value is: ${val}`);

    if (typeof length === 'number' && val.length !== length)
        throw new PreconError(`${paramName || 'Argument'} Buffer must be ${length} bytes. Is ${val.length} bytes.`);

    return val;
}


function defined(val, paramName) {
    if (typeof val === 'undefined')
        throw new PreconError(`${paramName || 'Argument'} must be defined.'`);

    return val;
}


function funct(val, paramName) {
    if (typeof val !== 'function')
        throw new PreconError(`${paramName || 'Argument'} must be a function. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function hex(val, paramName) {
    if (typeof val !== 'string')
        throw new PreconError(`${paramName || 'Argument'} must be a hex string. Type is "${typeof(val)}" and value is: ${val}`);

    if (val.length % 2 !== 0)
        throw new PreconError(`${paramName || 'Argument'} must be a hex string. Odd number of characters in value. Value is: ${val}`);

    const start = val.startsWith('0x') ? 2 : 0;

    for (let i = start; i < val.length; i++) {
        if (HEX_CHARS.indexOf(val.charAt(i)) === -1)
            throw new PreconError(`${paramName || 'Argument'} must be a hex string. Value is: ${val}`);
    }

    return val;
}


function instanceOf(val, instanceType, paramName) {
    if (!(val instanceof instanceType))
        throw new PreconError(`${paramName || 'Argument'} must be an instance of ${instanceType.constructor.name}. Is ${val && val.constructor ? val.constructor.name : val}`);

    return val;
}


function integer(val, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    if (!Number.isInteger(val))
        throw new PreconError(`${paramName || 'Argument'} must be an integer. Value is ${val}`);

    return val;
}


function map(val, paramName) {
    if (!(val instanceof Map))
        throw new PreconError(`${paramName || 'Argument'} must be a Map. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function minMaxBigNumberJS(val, min, max, paramName) {
    if (!BigNumber.isBigNumber(val) || val.isNaN())
        throw new PreconError(`${paramName || 'Argument'} must be a BigNumber (bignumber.js) type. Type is "${typeof(val)}" and value is: ${val}`);

    if (val.isLessThan(min) || val.isGreaterThan(max))
        throw new PreconError(`${paramName || 'Argument'} must be greater than or equal to ${min} and less than or equal to ${max}. Value is ${val}`);

    return val;
}


function minMaxInteger(val, min, max, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    if (!Number.isInteger(val))
        throw new PreconError(`${paramName || 'Argument'} must be an integer. Value is ${val}`);

    if (val < min || val > max)
        throw new PreconError(`${paramName || 'Argument'} must be greater than or equal to ${min} and less than or equal to ${max}. Value is ${val}`);

    return val;
}


function minMaxNumber(val, min, max, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    if (val < min || val > max)
        throw new PreconError(`${paramName || 'Argument'} must be greater than or equal to ${min} and less than or equal to ${max}. Value is ${val}`);

    return val;
}


function negativeBigNumberJS(val, paramName) {
    if (!BigNumber.isBigNumber(val) || val.isNaN())
        throw new PreconError(`${paramName || 'Argument'} must be BigNumber (bignumber.js) type. Type is "${typeof(val)}" and value is: ${val}`);

    if (val.isGreaterThan(0))
        throw new PreconError(`${paramName || 'Argument'} must be less than or equal to 0. Value is ${val}`);

    return val;
}


function negativeInteger(val, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    if (!Number.isInteger(val))
        throw new PreconError(`${paramName || 'Argument'} must be an integer. Value is ${val}`);

    if (val > 0)
        throw new PreconError(`${paramName || 'Argument'} must be less than or equal to 0. Value is ${val}`);

    return val;
}


function negativeNumber(val, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    if (val > 0)
        throw new PreconError(`${paramName || 'Argument'} must be less than or equal to 0. Value is ${val}`);

    return val;
}


function notNull(val, paramName) {
    defined(val, paramName);

    if (val == null)
        throw new PreconError(`${paramName || 'Argument'} must not be null.`);

    return val;
}


function number(val, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function obj(val, paramName) {
    if (typeof val !== 'object' || val === null)
        throw new PreconError(`${paramName || 'Argument'} must be an object. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function oneOf(val, optionsArr, paramName) {
    for (let i = 0; i < optionsArr.length; i++) {
        if (val === optionsArr[i])
            return val;
    }
    throw new PreconError(`${paramName || 'Argument'} must be a specific value: ${optionsArr.join(', ')}, is: ${val}`);
}


function oneOfInstance(val, instanceTypeArr, paramName) {
    let i;
    for (i = 0; i < instanceTypeArr.length; i++) {
        if (val instanceof instanceTypeArr[i])
            return val;
    }
    throw new PreconError(`${paramName || 'Argument'} must be one of a specific instance type.`);
}


function oneOfType(val, typeArr, paramName) {
    let i;
    for (i = 0; i < typeArr.length; i++) {
        if (typeof typeArr[i] !== 'string')
            throw new PreconError('Expected string for type');

        if (typeof val === typeArr[i])
            return val;
    }
    throw new PreconError(`${paramName || 'Argument'} must be one of a specific type: ${typeArr.join(', ')}, is: ${val}`);
}


function positiveBigNumberJS(val, paramName) {
    if (!BigNumber.isBigNumber(val) || val.isNaN())
        throw new PreconError(`${paramName || 'Argument'} must be BigNumber (bignumber.js) type. Type is "${typeof(val)}" and value is: ${val}`);

    if (val.isLessThan(0))
        throw new PreconError(`${paramName || 'Argument'} must be greater than or equal to 0. Value is ${val}`);

    return val;
}


function positiveInteger(val, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    if (!Number.isInteger(val))
        throw new PreconError(`${paramName || 'Argument'} must be an integer. Value is ${val}`);

    if (val < 0)
        throw new PreconError(`${paramName || 'Argument'} must be greater than or equal to 0. Value is ${val}`);

    return val;
}


function positiveNumber(val, paramName) {
    if (typeof val !== 'number' || isNaN(val))
        throw new PreconError(`${paramName || 'Argument'} must be a number. Type is "${typeof(val)}" and value is: ${val}`);

    if (val < 0)
        throw new PreconError(`${paramName || 'Argument'} must be greater than or equal to 0. Value is ${val}`);

    return val;
}


function set(val, paramName) {
    if (!(val instanceof Set))
        throw new PreconError(`${paramName || 'Argument'} must be a Set. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function string(val, paramName) {
    if (typeof val !== 'string')
        throw new PreconError(`${paramName || 'Argument'} must be a string. Type is "${typeof(val)}" and value is: ${val}`);

    return val;
}


function undef(val, paramName) {
    if (typeof val !== 'undefined')
        throw new PreconError(`${paramName || 'Argument'} should not be defined.'`);
}