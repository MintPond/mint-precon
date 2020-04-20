mint-precon
===========

Utilities to assert preconditions that must be met for the program execution to continue. These preconditions are
typically defined at the beginning of functions or Class constructors to ensure the correct value types are being passed
in as arguments. If a precondition is not met then an exception is thrown.

Preconditions prefixed with "opt_" (optional) will also accept values that are undefined or null.

This module has been developed and tested on [Node v10 and v12](https://nodejs.org/) 
for the [mining pools](https://mintpond.com/#!/ravencoin) at [MintPond](https://mintpond.com).

_Install_:
```
npm config set @mintpond:registry https://npm.pkg.github.com
npm install @mintpond/mint-precon
```

_Example_:
```js
const precon = require('mint-precon');

function combineNames(name1, name2) {
   precon.string(name1, 'name1');
   precon.string(name2, 'name2');

   return name1 + name2;
}

const names1 = combineNames('a', 'b'); // "ab"
const names2 = combineNames('a', 1); // throws exception
```

_Preconditions_:
```js
    /**
     * Value must be an array.
     *
     * @param val {*[]}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the array must be.
     * @returns {*[]} val
     */
    array(val, paramName, length);

    /**
     * Value must be an array or otherwise not set.
     *
     * @param val {*[]|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the array must be.
     * @returns {*[]|undefined|null} val
     */
    opt_array(val, paramName, length);

    /**
     * Value must be an array whose elements are a specific type of value.
     *
     * @param val {*[]}
     * @param type {string} The name of the type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]} val
     */
    arrayOf(val, type, paramName);

    /**
     * Value must be an array whose elements are a specific type of value or otherwise not set.
     *
     * @param val {*[]|undefined|null}
     * @param type {string} The name of the type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]|undefined|null} val
     */
    opt_arrayOf(val, type, paramName);

    /**
     * Value must be an array whose elements are an instance of a specific type.
     *
     * @param val {*[]}
     * @param instanceType {*} The instance type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]} val
     */
    arrayOfInstance(val, instanceType, paramName);

    /**
     * Value must be an array whose elements are an instance of a specific type or otherwise not set.
     *
     * @param val {*[]|undefined|null}
     * @param instanceType {*} The instance type.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*[]|undefined|null} val
     */
    opt_arrayOfInstance(val, instanceType, paramName);

    /**
     * Value must be a string of base56 characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    base56(val, paramName);

    /**
     * Value must be a string of base56 characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_base56(val, paramName);

    /**
     * Value must be a string of base58 characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    base58(val, paramName);

    /**
     * Value must be a string of base58 characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_base58(val, paramName);

    /**
     * Value must be a string of base64 characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    base64(val, paramName);

    /**
     * Value must be a string of base64 characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_base64(val, paramName);

    /**
     * Value must be a boolean type.
     *
     * @param val {boolean}
     * @param [paramName] {string} The name of the parameter.
     * @returns {boolean} val
     */
    boolean(val, paramName);

    /**
     * Value must be a boolean type or otherwise not set.
     *
     * @param val {boolean|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {boolean|undefined|null} val
     */
    opt_boolean(val, paramName);

    /**
     * Value must a BigInt type.
     *
     * @param val {BigInt}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigInt} val
     */
    bigint(val, paramName);

    /**
     * Value must a BigInt type or otherwise not set.
     *
     * @param val {BigInt|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigInt|undefined|null} val
     */
    opt_bigint(val, paramName);

    /**
     * Value must be a bignumber.js type.
     *
     * @param val {BigNumber}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber} val
     */
    bigNumberJS(val, paramName);

    /**
     * Value must be a bignumber.js type or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null} val
     */
    opt_bigNumberJS(val, paramName);

    /**
     * Value must be a Buffer type.
     *
     * @param val {Buffer}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the Buffer must be.
     * @returns {Buffer}
     */
    buffer(val, paramName, length);

    /**
     * Value must be a Buffer type or otherwise not set.
     *
     * @param val {Buffer|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @param [length] {number} The exact length the Buffer must be.
     * @returns {Buffer|undefined|null}
     */
    opt_buffer(val, paramName, length);

    /**
     * Value must be any type other than "undefined".
     *
     * @param val {*}
     * @param [paramName] {string} The name of the parameter.
     * @returns {*} val
     */
    defined(val, paramName);

    /**
     * Value must be a function.
     *
     * @param val {function}
     * @param [paramName] {string} The name of the parameter.
     * @returns {function} val
     */
    funct(val, paramName);

    /**
     * Value must be a function or otherwise not set.
     *
     * @param val {function|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {function|undefined|null} val
     */
    opt_funct(val, paramName);

    /**
     * Value must be a string of hexadecimal characters.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string} val
     */
    hex(val, paramName);

    /**
     * Value must be a string of hexadecimal characters or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null} val
     */
    opt_hex(val, paramName);

    /**
     * Value must be an instance of a specific type.
     *
     * @param val {*}
     * @param instanceType {*} The type of instance.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*} val
     */
    instanceOf(val, instanceType, paramName);

    /**
     * Value must be an instance of a specific type or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param instanceType {*} The type of instance.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null} val
     */
    opt_instanceOf(val, instanceType, paramName);

    /**
     * Value must be a number type with no decimal places.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    integer(val, paramName);

    /**
     * Value must be a number type with no decimal places or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_integer(val, paramName);

    /**
     * Value must be a Map.
     *
     * @param val {Map}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Map} val
     */
    map(val, paramName);

    /**
     * Value must be a Map or otherwise not set.
     *
     * @param val {Map|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Map|undefined|null} val
     */
    opt_map(val, paramName);

    /**
     * Value must be a bignumber.js type and the value must be between specified min and max values.
     *
     * @param val {BigNumber}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber} val
     */
    minMaxBigNumberJS(val, min, max, paramName);

    /**
     * Value must be a bignumber.js type and the value must be between specified min and max values or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null} val
     */
    opt_minMaxBigNumberJS(val, min, max, paramName);

    /**
     * Value must be a number type with no decimal places and must be between specified min and max values.
     *
     * @param val {number}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    minMaxInteger(val, min, max, paramName);

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
    opt_minMaxInteger(val, min, max, paramName);

    /**
     * Value must be a number type with a value between the specified min and max values.
     *
     * @param val {number}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    minMaxNumber(val, min, max, paramName);

    /**
     * Value must be a number type with a value between the specified min and max values or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param min {number} The minimum value (inclusive).
     * @param max {number} The maximum value (inclusive).
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_minMaxNumber(val, min, max, paramName);

    /**
     * Value must be bignumber.js type with a value less than or equal to 0.
     *
     * @param val {BigNumber}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber} val
     */
    negativeBigNumberJS(val, paramName);

    /**
     * Value must be bignumber.js type with a value less than or equal to 0 or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null} val
     */
    opt_negativeBigNumberJS(val, paramName);

    /**
     * Value must be a number type with no decimal places and a value less than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    negativeInteger(val, paramName);

    /**
     * Value must be a number type with no decimal places and a value less than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_negativeInteger(val, paramName);

    /**
     * Value must be a number type with a value less than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number} val
     */
    negativeNumber(val, paramName);

    /**
     * Value must be a number type with a value less than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null} val
     */
    opt_negativeNumber(val, paramName);

    /**
     * Value cannot be null or undefined.
     *
     * @param val {*}
     * @param [paramName] {string} The name of the parameter.
     * @returns {*} val
     */
    notNull(val, paramName);

    /**
     * Value must be a number type.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number}
     */
    number(val, paramName);

    /**
     * Value must be a number type or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null}
     */
    opt_number(val, paramName);

    /**
     * Value must be an object type.
     *
     * @param val {object}
     * @param [paramName] {string} The name of the parameter.
     * @returns {object}
     */
    obj(val, paramName);

    /**
     * Value must be an object type or otherwise not set.
     *
     * @param val {object|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {object|undefined|null}
     */
    opt_obj(val, paramName);

    /**
     * Value must be one of the specified values.
     *
     * @param val {*}
     * @param optionsArr {*[]}
     * @param [paramName] {string} The name of the parameter.
     * @returns {*}
     */
    oneOf(val, optionsArr, paramName);

    /**
     * Value must be one of the specified values or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param optionsArr {*[]} Array of valid values.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null}
     */
    opt_oneOf(val, optionsArr, paramName);

    /**
     * Value must be an instance of one of the specified instance types.
     *
     * @param val {*}
     * @param instanceTypeArr {*[]} Array of valid instance types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*}
     */
    oneOfInstance(val, instanceTypeArr, paramName);

    /**
     * Value must be an instance of one of the specified instance types or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param instanceTypeArr {*[]} Array of valid instance types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null}
     */
    opt_oneOfInstance(val, instanceTypeArr, paramName);

    /**
     * Value must be one of the specified value types.
     *
     * @param val {*}
     * @param typeArr {string[]} Array of valid value types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*}
     */
    oneOfType(val, typeArr, paramName);

    /**
     * Value must be one of the specified value types or otherwise not set.
     *
     * @param val {*|undefined|null}
     * @param typeArr {string[]} Array of valid value types.
     * @param [paramName] {string} The name of the parameter.
     * @returns {*|undefined|null}
     */
    opt_oneOfType(val, typeArr, paramName);

    /**
     * Value must be a bignumber.js type with a value greater than or equal to 0.
     *
     * @param val {BigNumber}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber}
     */
    positiveBigNumberJS(val, paramName);

    /**
     * Value must be a bignumber.js type with a value greater than or equal to 0 or otherwise not set.
     *
     * @param val {BigNumber|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {BigNumber|undefined|null}
     */
    opt_positiveBigNumberJS(val, paramName);


    /**
     * Value must be a number type with no decimal places and a value greater than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number}
     */
    positiveInteger(val, paramName);

    /**
     * Value must be a number type with no decimal places and a value greater than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null}
     */
    opt_positiveInteger(val, paramName);

    /**
     * Value must be a number type with a value greater than or equal to 0.
     *
     * @param val {number}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number}
     */
    positiveNumber(val, paramName);

    /**
     * Value must be a number type with a value greater than or equal to 0 or otherwise not set.
     *
     * @param val {number|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {number|undefined|null}
     */
    opt_positiveNumber(val, paramName);

    /**
     * Value must be a Set.
     *
     * @param val {Set}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Set}
     */
    set(val, paramName);

    /**
     * Value must be a Set or otherwise not set.
     *
     * @param val {Set|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {Set|undefined|null}
     */
    opt_set(val, paramName);

    /**
     * Value must be a string.
     *
     * @param val {string}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string}
     */
    string(val, paramName);

    /**
     * Value must be a string or otherwise not set.
     *
     * @param val {string|undefined|null}
     * @param [paramName] {string} The name of the parameter.
     * @returns {string|undefined|null}
     */
    opt_string(val, paramName);

    /**
     * Value must not be defined at all.
     *
     * @param val {undefined}
     * @param [paramName] {string} The name of the parameter.
     */
    undef(val, paramName);
```