'use strict';

const
    precon = require('./../index'),
    BigNumber = require('bignumber.js');

context('enabled', () => {

    beforeEach(() => {
        precon.enabled = true;
    })

    describe('array precondition', () => {

        it('should pass if argument is an array', () => {
            precon.array([]);
        });

        it('should throw if argument is not an array', () => {
            shouldThrow(() => precon.array('string'));
            shouldThrow(() => precon.array(1));
            shouldThrow(() => precon.array(1n));
            shouldThrow(() => precon.array(true));
            shouldThrow(() => precon.array(false));
            shouldThrow(() => precon.array({}));
            shouldThrow(() => precon.array(null));
            shouldThrow(() => precon.array(undefined));
        });
    });

    describe('opt_array precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_array(null, 'array');
            precon.opt_array(undefined, 'array');
        });

        it('should pass if argument is an array', () => {
            precon.opt_array([], 'array');
        });

        it('should throw if argument is not an array', () => {
            shouldThrow(() => precon.opt_array('string'));
            shouldThrow(() => precon.opt_array(1));
            shouldThrow(() => precon.opt_array(1n));
            shouldThrow(() => precon.opt_array(true));
            shouldThrow(() => precon.opt_array(false));
            shouldThrow(() => precon.opt_array({}));
        });
    });

    describe('arrayOf precondition', () => {

        it('should pass if argument is an array', () => {
            precon.arrayOf([], 'string');
            precon.arrayOf(['', 'abc'], 'string');
            precon.arrayOf([], 'number');
            precon.arrayOf([1, 2], 'number');
            precon.arrayOf([], 'boolean');
            precon.arrayOf([true, false], 'boolean');
        });

        it('should throw if argument is an array containing invalid types', () => {
            shouldThrow(() => precon.arrayOf([1], 'string'));
            shouldThrow(() => precon.arrayOf(['abc', 1], 'string'));
            shouldThrow(() => precon.arrayOf(['abc'], 'number'));
            shouldThrow(() => precon.arrayOf([1, 'abc'], 'number'));
            shouldThrow(() => precon.arrayOf([1, 'abc'], 'boolean'));
            shouldThrow(() => precon.arrayOf(['abc'], 'boolean'));
            shouldThrow(() => precon.arrayOf([true, false, 'abc'], 'boolean'));
        });

        it('should throw if argument is not an array', () => {
            shouldThrow(() => precon.arrayOf('string', 'string'));
            shouldThrow(() => precon.arrayOf(1, 'number'));
            shouldThrow(() => precon.arrayOf(1n, 'bigint'));
            shouldThrow(() => precon.arrayOf(true, 'boolean'));
            shouldThrow(() => precon.arrayOf(false, 'string'));
            shouldThrow(() => precon.arrayOf({}, 'object'));
            shouldThrow(() => precon.arrayOf(null, 'object'));
            shouldThrow(() => precon.arrayOf(undefined, 'undefined'));
        });
    });

    describe('opt_arrayOf precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_arrayOf(null, 'string');
            precon.opt_arrayOf(null, 'number');
            precon.opt_arrayOf(null, 'boolean');
            precon.opt_arrayOf(undefined, 'string');
            precon.opt_arrayOf(undefined, 'number');
            precon.opt_arrayOf(undefined, 'boolean');
        });

        it('should pass if argument is an array', () => {
            precon.opt_arrayOf([], 'string');
            precon.opt_arrayOf(['', 'abc'], 'string');
            precon.opt_arrayOf([], 'number');
            precon.opt_arrayOf([1, 2], 'number');
            precon.opt_arrayOf([], 'boolean');
            precon.opt_arrayOf([true, false], 'boolean');
        });

        it('should throw if argument is an array containing invalid types', () => {
            shouldThrow(() => precon.opt_arrayOf([1], 'string'));
            shouldThrow(() => precon.opt_arrayOf(['abc', 1], 'string'));
            shouldThrow(() => precon.opt_arrayOf(['abc'], 'number'));
            shouldThrow(() => precon.opt_arrayOf([1, 'abc'], 'number'));
            shouldThrow(() => precon.opt_arrayOf([1, 'abc'], 'boolean'));
            shouldThrow(() => precon.opt_arrayOf(['abc'], 'boolean'));
            shouldThrow(() => precon.opt_arrayOf([true, false, 'abc'], 'boolean'));
        });

        it('should throw if argument is not an array', () => {
            shouldThrow(() => precon.opt_arrayOf('string', 'string'));
            shouldThrow(() => precon.opt_arrayOf(1, 'number'));
            shouldThrow(() => precon.opt_arrayOf(1n, 'string'));
            shouldThrow(() => precon.opt_arrayOf(true, 'boolean'));
            shouldThrow(() => precon.opt_arrayOf(false, 'string'));
            shouldThrow(() => precon.opt_arrayOf({}, 'object'));
        });
    });

    describe('arrayOfInstance precondition', () => {

        it('should pass if argument is an array', () => {
            function Instance() {}

            precon.arrayOfInstance([], Instance);
            precon.arrayOfInstance([new Instance()], Instance);
        });

        it('should throw if argument is an array containing invalid types', () => {
            function Instance() {}

            shouldThrow(() => precon.arrayOfInstance([1], Instance));
            shouldThrow(() => precon.arrayOfInstance([new Instance(), 1], Instance));
            shouldThrow(() => precon.arrayOfInstance(['abc'], Instance));
        });

        it('should throw if argument is not an array', () => {
            function Instance() {}

            shouldThrow(() => precon.arrayOfInstance('string', Instance));
            shouldThrow(() => precon.arrayOfInstance(1, Instance));
            shouldThrow(() => precon.arrayOfInstance(1n, Instance));
            shouldThrow(() => precon.arrayOfInstance(true, Instance));
            shouldThrow(() => precon.arrayOfInstance(false, Instance));
            shouldThrow(() => precon.arrayOfInstance({}, Instance));
            shouldThrow(() => precon.arrayOfInstance(null, Instance));
            shouldThrow(() => precon.arrayOfInstance(undefined, Instance));
        });
    });

    describe('opt_arrayOfInstance precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_arrayOf(null, 'string');
            precon.opt_arrayOf(undefined, 'string');
        });

        it('should pass if argument is an array', () => {
            function Instance() {}

            precon.opt_arrayOfInstance([], Instance);
            precon.opt_arrayOfInstance([new Instance()], Instance);
        });

        it('should throw if argument is an array containing invalid types', () => {
            function Instance() {}

            shouldThrow(() => precon.opt_arrayOfInstance([1], Instance));
            shouldThrow(() => precon.opt_arrayOfInstance([new Instance(), 1], Instance));
            shouldThrow(() => precon.opt_arrayOfInstance(['abc'], Instance));
        });

        it('should throw if argument is not an array', () => {
            function Instance() {}

            shouldThrow(() => precon.opt_arrayOfInstance('string', Instance));
            shouldThrow(() => precon.opt_arrayOfInstance(1, Instance));
            shouldThrow(() => precon.opt_arrayOfInstance(1n, Instance));
            shouldThrow(() => precon.opt_arrayOfInstance(true, Instance));
            shouldThrow(() => precon.opt_arrayOfInstance(false, Instance));
            shouldThrow(() => precon.opt_arrayOfInstance({}, Instance));
        });
    });

    describe('base56 precondition', () => {

        it('should pass a base56 string', () => {
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz');
            precon.base56('23456789');
            precon.base56('ABCDEFGHJKLMNPQRSTUVWXYZ');
            precon.base56('abcdefghijkmnpqrstuvwxyz');
        });

        it('should throw if string contains non-base56 characters', () => {
            shouldThrow(() => precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz1'));
            shouldThrow(() => precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0'));
            shouldThrow(() => precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzI'));
            shouldThrow(() => precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzO'));
            shouldThrow(() => precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzl'));
            shouldThrow(() => precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzo'));
        });
    });

    describe('opt_base56 precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_base56(null);
            precon.opt_base56(undefined);
        });

        it('should pass a base56 string', () => {
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz');
            precon.opt_base56('23456789');
            precon.opt_base56('ABCDEFGHJKLMNPQRSTUVWXYZ');
            precon.opt_base56('abcdefghijkmnpqrstuvwxyz');
        });

        it('should throw if string contains non-base56 characters', () => {
            shouldThrow(() => precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz1'));
            shouldThrow(() => precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0'));
            shouldThrow(() => precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzI'));
            shouldThrow(() => precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzO'));
            shouldThrow(() => precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzl'));
            shouldThrow(() => precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzo'));
        });
    });

    describe('base58 precondition', () => {

        it('should pass a base58 string', () => {
            precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
            precon.base58('123456789');
            precon.base58('ABCDEFGHJKLMNPQRSTUVWXYZ');
            precon.base58('abcdefghijkmnopqrstuvwxyz');
        });

        it('should throw if string contains non-base58 characters', () => {
            shouldThrow(() => precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0'));
            shouldThrow(() => precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI'));
            shouldThrow(() => precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO'));
            shouldThrow(() => precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl'));
        });
    });

    describe('opt_base58 precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_base58(null);
            precon.opt_base58(undefined);
        });

        it('should pass a base58 string', () => {
            precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
            precon.opt_base58('123456789');
            precon.opt_base58('ABCDEFGHJKLMNPQRSTUVWXYZ');
            precon.opt_base58('abcdefghijkmnopqrstuvwxyz');
        });

        it('should throw if string contains non-base58 characters', () => {
            shouldThrow(() => precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0'));
            shouldThrow(() => precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI'));
            shouldThrow(() => precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO'));
            shouldThrow(() => precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl'));
        });
    });

    describe('base64 precondition', () => {

        it('should pass a base64 string', () => {
            precon.base64('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+=');
            precon.base64('1234567890');
            precon.base64('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            precon.base64('abcdefghijklmnopqrstuvwxyz');
        });

        it('should throw if string has odd number of characters', () => {
            shouldThrow(() => precon.base64('123'));
            shouldThrow(() => precon.base64('1234567890='));
        });

        it('should throw if string contains non-base64 characters', () => {
            shouldThrow(() => precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0'));
            shouldThrow(() => precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI'));
            shouldThrow(() => precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO'));
            shouldThrow(() => precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl'));
        });
    });

    describe('opt_base64 precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_base64(null);
            precon.opt_base64(undefined);
        });

        it('should pass a base64 string', () => {
            precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
            precon.opt_base64('1234567890');
            precon.opt_base64('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            precon.opt_base64('abcdefghijklmnopqrstuvwxyz');
        });

        it('should throw if string has odd number of characters', () => {
            shouldThrow(() => precon.opt_base64('123'));
            shouldThrow(() => precon.opt_base64('1234567890='));
        });

        it('should throw if string contains non-base64 characters', () => {
            shouldThrow(() => precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0'));
            shouldThrow(() => precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI'));
            shouldThrow(() => precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO'));
            shouldThrow(() => precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl'));
        });
    });

    describe('boolean precondition', () => {

        it('should pass if argument is a boolean', () => {
            precon.boolean(true);
            precon.boolean(false);
        });

        it('should throw if argument is not a boolean', () => {
            shouldThrow(() => precon.boolean('string'));
            shouldThrow(() => precon.boolean(1));
            shouldThrow(() => precon.boolean(1n));
            shouldThrow(() => precon.boolean({}));
            shouldThrow(() => precon.boolean(null));
            shouldThrow(() => precon.boolean(undefined));
        });
    });

    describe('opt_boolean precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_boolean(null);
            precon.opt_boolean(undefined);
        });

        it('should pass if argument is a boolean', () => {
            precon.opt_boolean(true);
            precon.opt_boolean(false);
        });

        it('should throw if argument is not a boolean', () => {
            shouldThrow(() => precon.opt_boolean('string'));
            shouldThrow(() => precon.opt_boolean(1));
            shouldThrow(() => precon.opt_boolean(1n));
            shouldThrow(() => precon.opt_boolean({}));
        });
    });

    describe('bigint precondition', () => {

        it('should pass if argument is a bigint', () => {
            precon.bigint(1n);
        });

        it('should throw if argument is not a bigint', () => {
            shouldThrow(() => precon.bigint('string'));
            shouldThrow(() => precon.bigint(1));
            shouldThrow(() => precon.bigint(true));
            shouldThrow(() => precon.bigint(false));
            shouldThrow(() => precon.bigint({}));
            shouldThrow(() => precon.bigint(null));
            shouldThrow(() => precon.bigint(undefined));
        });
    });

    describe('opt_bigint precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_bigint(null);
            precon.opt_bigint(undefined);
        });

        it('should pass if argument is a bigint', () => {
            precon.opt_bigint(0n);
        });

        it('should throw if argument is not a bigint', () => {
            shouldThrow(() => precon.opt_bigint('string'));
            shouldThrow(() => precon.opt_bigint(1));
            shouldThrow(() => precon.opt_bigint(true));
            shouldThrow(() => precon.opt_bigint(false));
            shouldThrow(() => precon.opt_bigint({}));
        });
    });

    describe('bigNumberJS precondition', () => {

        it('should pass if argument is a BigNumber', () => {
            precon.bigNumberJS(new BigNumber(10));
        });

        it('should throw if argument is not a BigNumber', () => {
            shouldThrow(() => precon.bigNumberJS('string'));
            shouldThrow(() => precon.bigNumberJS(1));
            shouldThrow(() => precon.bigNumberJS(1n));
            shouldThrow(() => precon.bigNumberJS(true));
            shouldThrow(() => precon.bigNumberJS(false));
            shouldThrow(() => precon.bigNumberJS({}));
            shouldThrow(() => precon.bigNumberJS(null));
            shouldThrow(() => precon.bigNumberJS(undefined));
        });
    });

    describe('opt_bigNumberJS precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_bigNumberJS(null);
            precon.opt_bigNumberJS(undefined);
        });

        it('should pass if argument is a BigNumber', () => {
            precon.opt_bigNumberJS(new BigNumber(5));
        });

        it('should throw if argument is not a BigNumber', () => {
            shouldThrow(() => precon.opt_bigNumberJS('string'));
            shouldThrow(() => precon.opt_bigNumberJS(1));
            shouldThrow(() => precon.opt_bigNumberJS(true));
            shouldThrow(() => precon.opt_bigNumberJS(false));
            shouldThrow(() => precon.opt_bigNumberJS({}));
        });
    });

    describe('buffer precondition', () => {

        it('should pass if argument is a Buffer', () => {
            precon.buffer(Buffer.alloc(10));
        });

        it('should throw if argument is not a Buffer', () => {
            shouldThrow(() => precon.buffer('string'));
            shouldThrow(() => precon.buffer(1));
            shouldThrow(() => precon.buffer(1n));
            shouldThrow(() => precon.buffer(true));
            shouldThrow(() => precon.buffer(false));
            shouldThrow(() => precon.buffer({}));
            shouldThrow(() => precon.buffer(null));
            shouldThrow(() => precon.buffer(undefined));
        });
    });

    describe('opt_buffer precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_buffer(null);
            precon.opt_buffer(undefined);
        });

        it('should pass if argument is a Buffer', () => {
            precon.opt_buffer(Buffer.alloc(3));
        });

        it('should throw if argument is not a BigNumber', () => {
            shouldThrow(() => precon.opt_buffer('string'));
            shouldThrow(() => precon.opt_buffer(1));
            shouldThrow(() => precon.opt_buffer(true));
            shouldThrow(() => precon.opt_buffer(false));
            shouldThrow(() => precon.opt_buffer({}));
        });
    });

    describe('defined precondition', () => {

        it('should pass if argument is defined', () => {
            precon.defined('string');
            precon.defined(1);
            precon.defined(1n);
            precon.defined(true);
            precon.defined(false);
            precon.defined({});
            precon.defined(null);
        });

        it('should throw if argument is not defined', () => {
            shouldThrow(() => precon.defined(undefined));
        });
    });

    describe('funct precondition', () => {

        it('should pass if argument is a function', () => {
            precon.funct(function () {});
        });

        it('should throw if argument is not a function', () => {
            shouldThrow(() => precon.funct('string'));
            shouldThrow(() => precon.funct(1));
            shouldThrow(() => precon.funct(true));
            shouldThrow(() => precon.funct(false));
            shouldThrow(() => precon.funct({}));
            shouldThrow(() => precon.funct(null));
            shouldThrow(() => precon.funct(undefined));
        });
    });

    describe('opt_funct precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_funct(null);
            precon.opt_funct(undefined);
        });

        it('should pass if argument is a function', () => {
            precon.opt_funct(function () {});
        });

        it('should throw if argument is not a function', () => {
            shouldThrow(() => precon.opt_funct('string'));
            shouldThrow(() => precon.opt_funct(1));
            shouldThrow(() => precon.opt_funct(true));
            shouldThrow(() => precon.opt_funct(false));
            shouldThrow(() => precon.opt_funct({}));
        });
    });

    describe('hex precondition', () => {

        it('should pass a hex string', () => {
            precon.hex('1234567890ABCDEF');
            precon.hex('1234567890abcdef');
        });

        it('should throw if odd number of characters in string', () => {
            shouldThrow(() => precon.hex('123'));
        });

        it('should throw if string contains non-base58 characters', () => {
            shouldThrow(() => precon.hex('ag'));
            shouldThrow(() => precon.hex('ah'));
            shouldThrow(() => precon.hex('ai'));
            shouldThrow(() => precon.hex('aj'));
            shouldThrow(() => precon.hex('ak'));
            shouldThrow(() => precon.hex('al'));
            shouldThrow(() => precon.hex('am'));
            shouldThrow(() => precon.hex('an'));
            shouldThrow(() => precon.hex('ao'));
            shouldThrow(() => precon.hex('ap'));
            shouldThrow(() => precon.hex('aq'));
            shouldThrow(() => precon.hex('ar'));
            shouldThrow(() => precon.hex('as'));
            shouldThrow(() => precon.hex('at'));
            shouldThrow(() => precon.hex('au'));
            shouldThrow(() => precon.hex('av'));
            shouldThrow(() => precon.hex('aw'));
            shouldThrow(() => precon.hex('ax'));
            shouldThrow(() => precon.hex('ay'));
            shouldThrow(() => precon.hex('az'));
        });
    });

    describe('opt_hex precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_hex(null);
            precon.opt_hex(undefined);
        });

        it('should pass a hex string', () => {
            precon.opt_hex('1234567890ABCDEF');
            precon.opt_hex('1234567890abcdef');
        });

        it('should throw if odd number of characters in string', () => {
            shouldThrow(() => precon.opt_hex('123'));
        });

        it('should throw if string contains non-base58 characters', () => {
            shouldThrow(() => precon.opt_hex('ag'));
            shouldThrow(() => precon.opt_hex('ah'));
            shouldThrow(() => precon.opt_hex('ai'));
            shouldThrow(() => precon.opt_hex('aj'));
            shouldThrow(() => precon.opt_hex('ak'));
            shouldThrow(() => precon.opt_hex('al'));
            shouldThrow(() => precon.opt_hex('am'));
            shouldThrow(() => precon.opt_hex('an'));
            shouldThrow(() => precon.opt_hex('ao'));
            shouldThrow(() => precon.opt_hex('ap'));
            shouldThrow(() => precon.opt_hex('aq'));
            shouldThrow(() => precon.opt_hex('ar'));
            shouldThrow(() => precon.opt_hex('as'));
            shouldThrow(() => precon.opt_hex('at'));
            shouldThrow(() => precon.opt_hex('au'));
            shouldThrow(() => precon.opt_hex('av'));
            shouldThrow(() => precon.opt_hex('aw'));
            shouldThrow(() => precon.opt_hex('ax'));
            shouldThrow(() => precon.opt_hex('ay'));
            shouldThrow(() => precon.opt_hex('az'));
        });
    });

    describe('instanceOf precondition', () => {

        it('should pass if argument is a instance of _', () => {
            function Instance() {}

            precon.instanceOf(new Instance(), Instance);
        });

        it('should throw if argument is not am instance of _', () => {
            function Instance() {}

            shouldThrow(() => precon.instanceOf('string', Instance));
            shouldThrow(() => precon.instanceOf(1, Instance));
            shouldThrow(() => precon.instanceOf(true, Instance));
            shouldThrow(() => precon.instanceOf(false, Instance));
            shouldThrow(() => precon.instanceOf({}, Instance));
            shouldThrow(() => precon.instanceOf(null, Instance));
            shouldThrow(() => precon.instanceOf(undefined, Instance));
        });
    });

    describe('opt_instanceOf precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_instanceOf(null);
            precon.opt_instanceOf(undefined);
        });

        it('should pass if argument is an instance of _', () => {
            function Instance() {}

            precon.opt_instanceOf(new Instance(), Instance);
        });

        it('should throw if argument is not a function', () => {
            function Instance() {}

            shouldThrow(() => precon.opt_instanceOf('string', Instance));
            shouldThrow(() => precon.opt_instanceOf(1, Instance));
            shouldThrow(() => precon.opt_instanceOf(true, Instance));
            shouldThrow(() => precon.opt_instanceOf(false, Instance));
            shouldThrow(() => precon.opt_instanceOf({}, Instance));
        });
    });

    describe('integer precondition', () => {

        it('should pass if argument is an integer', () => {
            precon.integer(1);
            precon.integer(-1);
        });

        it('should throw if argument is not an integer', () => {
            shouldThrow(() => precon.integer('string'));
            shouldThrow(() => precon.integer(1.1));
            shouldThrow(() => precon.integer(-1.1));
            shouldThrow(() => precon.integer(true));
            shouldThrow(() => precon.integer(false));
            shouldThrow(() => precon.integer({}));
            shouldThrow(() => precon.integer(null));
            shouldThrow(() => precon.integer(undefined));
        });
    });

    describe('opt_integer precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_integer(null);
            precon.opt_integer(undefined);
        });

        it('should pass if argument is an integer', () => {
            precon.opt_integer(1);
            precon.opt_integer(-1);
        });

        it('should throw if argument is not an integer', () => {
            shouldThrow(() => precon.opt_integer('string'));
            shouldThrow(() => precon.opt_integer(1.1));
            shouldThrow(() => precon.opt_integer(-1.1));
            shouldThrow(() => precon.opt_integer(true));
            shouldThrow(() => precon.opt_integer(false));
            shouldThrow(() => precon.opt_integer({}));
        });
    });

    describe('map precondition', () => {

        it('should pass if argument is a map', () => {
            precon.map(new Map());
        });

        it('should throw if argument is not a map', () => {
            shouldThrow(() => precon.map('string'));
            shouldThrow(() => precon.map(1.1));
            shouldThrow(() => precon.map(-1.1));
            shouldThrow(() => precon.map(true));
            shouldThrow(() => precon.map(false));
            shouldThrow(() => precon.map({}));
            shouldThrow(() => precon.map(null));
            shouldThrow(() => precon.map(undefined));
        });
    });

    describe('opt_map precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_map(null);
            precon.opt_map(undefined);
        });

        it('should pass if argument is a map', () => {
            precon.opt_map(new Map());
        });

        it('should throw if argument is not a map', () => {
            shouldThrow(() => precon.opt_map('string'));
            shouldThrow(() => precon.opt_map(1.1));
            shouldThrow(() => precon.opt_map(-1.1));
            shouldThrow(() => precon.opt_map(true));
            shouldThrow(() => precon.opt_map(false));
            shouldThrow(() => precon.opt_map({}));
        });
    });

    describe('minMaxBigNumberJS precondition', () => {

        it('should pass if argument is a BigNumber', () => {
            precon.minMaxBigNumberJS(new BigNumber(0), 0, 20);
            precon.minMaxBigNumberJS(new BigNumber(10), 0, 20);
            precon.minMaxBigNumberJS(new BigNumber(20), 0, 20);
        });

        it('should throw if argument is less than min', () => {
            shouldThrow(() => precon.minMaxBigNumberJS(new BigNumber(10), 15, 20));
        });

        it('should throw if argument is more than max', () => {
            shouldThrow(() => precon.minMaxBigNumberJS(new BigNumber(30), 15, 20));
        });

        it('should throw if argument is not a BigNumber', () => {
            shouldThrow(() => precon.minMaxBigNumberJS('string', 0, 20));
            shouldThrow(() => precon.minMaxBigNumberJS(1, 0, 20));
            shouldThrow(() => precon.minMaxBigNumberJS(1n, 0, 20));
            shouldThrow(() => precon.minMaxBigNumberJS(true, 0, 20));
            shouldThrow(() => precon.minMaxBigNumberJS(false, 0, 20));
            shouldThrow(() => precon.minMaxBigNumberJS({}, 0, 20));
            shouldThrow(() => precon.minMaxBigNumberJS(null, 0, 20));
            shouldThrow(() => precon.minMaxBigNumberJS(undefined, 0, 20));
        });
    });

    describe('opt_minMaxBigNumberJS precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_minMaxBigNumberJS(null, 0, 20);
            precon.opt_minMaxBigNumberJS(undefined, 0, 20);
        });

        it('should pass if argument is a BigNumber', () => {
            precon.opt_minMaxBigNumberJS(new BigNumber(0), 0, 20);
            precon.opt_minMaxBigNumberJS(new BigNumber(10), 0, 20);
            precon.opt_minMaxBigNumberJS(new BigNumber(20), 0, 20);
        });

        it('should throw if argument is less than min', () => {
            shouldThrow(() => precon.opt_minMaxBigNumberJS(new BigNumber(10), 15, 20));
        });

        it('should throw if argument is more than max', () => {
            shouldThrow(() => precon.opt_minMaxBigNumberJS(new BigNumber(30), 15, 20));
        });

        it('should throw if argument is not a BigNumber', () => {
            shouldThrow(() => precon.opt_minMaxBigNumberJS('string', 0, 20));
            shouldThrow(() => precon.opt_minMaxBigNumberJS(1, 0, 20));
            shouldThrow(() => precon.opt_minMaxBigNumberJS(1n, 0, 20));
            shouldThrow(() => precon.opt_minMaxBigNumberJS(true, 0, 20));
            shouldThrow(() => precon.opt_minMaxBigNumberJS(false, 0, 20));
            shouldThrow(() => precon.opt_minMaxBigNumberJS({}, 0, 20));
        });
    });

    describe('minMaxInteger precondition', () => {

        it('should pass if argument is an integer', () => {
            precon.minMaxInteger(0, 0, 20);
            precon.minMaxInteger(10, 0, 20);
            precon.minMaxInteger(20, 0, 20);
        });

        it('should throw if argument is less than min', () => {
            shouldThrow(() => precon.minMaxInteger(10, 15, 20));
        });

        it('should throw if argument is more than max', () => {
            shouldThrow(() => precon.minMaxInteger(30, 15, 20));
        });

        it('should throw if argument is not an integer', () => {
            shouldThrow(() => precon.minMaxInteger('string', 0, 20));
            shouldThrow(() => precon.minMaxInteger(1.1, 0, 20));
            shouldThrow(() => precon.minMaxInteger(1n, 0, 20));
            shouldThrow(() => precon.minMaxInteger(true, 0, 20));
            shouldThrow(() => precon.minMaxInteger(false, 0, 20));
            shouldThrow(() => precon.minMaxInteger({}, 0, 20));
            shouldThrow(() => precon.minMaxInteger(null, 0, 20));
            shouldThrow(() => precon.minMaxInteger(undefined, 0, 20));
        });
    });

    describe('opt_minMaxInteger precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_minMaxInteger(null, 0, 20);
            precon.opt_minMaxInteger(undefined, 0, 20);
        });

        it('should pass if argument is an integer', () => {
            precon.opt_minMaxInteger(0, 0, 20);
            precon.opt_minMaxInteger(10, 0, 20);
            precon.opt_minMaxInteger(20, 0, 20);
        });

        it('should throw if argument is less than min', () => {
            shouldThrow(() => precon.opt_minMaxInteger(10, 15, 20));
        });

        it('should throw if argument is more than max', () => {
            shouldThrow(() => precon.opt_minMaxInteger(30, 15, 20));
        });

        it('should throw if argument is not an integer', () => {
            shouldThrow(() => precon.opt_minMaxInteger('string', 0, 20));
            shouldThrow(() => precon.opt_minMaxInteger(1.1, 0, 20));
            shouldThrow(() => precon.opt_minMaxInteger(1n, 0, 20));
            shouldThrow(() => precon.opt_minMaxInteger(true, 0, 20));
            shouldThrow(() => precon.opt_minMaxInteger(false, 0, 20));
            shouldThrow(() => precon.opt_minMaxInteger({}, 0, 20));
        });
    });

    describe('minMaxNumber precondition', () => {

        it('should pass if argument is a number', () => {
            precon.minMaxNumber(0, 0, 20);
            precon.minMaxNumber(10, 0, 20);
            precon.minMaxNumber(10.5, 0, 20);
            precon.minMaxNumber(20, 0, 20);
        });

        it('should throw if argument is less than min', () => {
            shouldThrow(() => precon.minMaxNumber(10, 15, 20));
        });

        it('should throw if argument is more than max', () => {
            shouldThrow(() => precon.minMaxNumber(30, 15, 20));
        });

        it('should throw if argument is not a numberr', () => {
            shouldThrow(() => precon.minMaxNumber('string', 0, 20));
            shouldThrow(() => precon.minMaxNumber(1n, 0, 20));
            shouldThrow(() => precon.minMaxNumber(true, 0, 20));
            shouldThrow(() => precon.minMaxNumber(false, 0, 20));
            shouldThrow(() => precon.minMaxNumber({}, 0, 20));
            shouldThrow(() => precon.minMaxNumber(null, 0, 20));
            shouldThrow(() => precon.minMaxNumber(undefined, 0, 20));
        });
    });

    describe('opt_minMaxNumber precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_minMaxNumber(null, 0, 20);
            precon.opt_minMaxNumber(undefined, 0, 20);
        });

        it('should pass if argument is a number', () => {
            precon.opt_minMaxNumber(0, 0, 20);
            precon.opt_minMaxNumber(10, 0, 20);
            precon.opt_minMaxNumber(10.5, 0, 20);
            precon.opt_minMaxNumber(20, 0, 20);
        });

        it('should throw if argument is less than min', () => {
            shouldThrow(() => precon.opt_minMaxNumber(10, 15, 20));
        });

        it('should throw if argument is more than max', () => {
            shouldThrow(() => precon.opt_minMaxNumber(30, 15, 20));
        });

        it('should throw if argument is not a numberr', () => {
            shouldThrow(() => precon.opt_minMaxNumber('string', 0, 20));
            shouldThrow(() => precon.opt_minMaxNumber(1n, 0, 20));
            shouldThrow(() => precon.opt_minMaxNumber(true, 0, 20));
            shouldThrow(() => precon.opt_minMaxNumber(false, 0, 20));
            shouldThrow(() => precon.opt_minMaxNumber({}, 0, 20));
        });
    });


    describe('negativeBigNumberJS precondition', () => {

        it('should pass if argument is a negative BigNumber', () => {
            precon.negativeBigNumberJS(new BigNumber(0));
            precon.negativeBigNumberJS(new BigNumber(-10));
        });

        it('should throw if argument is not a negative BigNumber', () => {
            shouldThrow(() => precon.negativeBigNumberJS('string'));
            shouldThrow(() => precon.negativeBigNumberJS(1));
            shouldThrow(() => precon.negativeBigNumberJS(1n));
            shouldThrow(() => precon.negativeBigNumberJS(-1));
            shouldThrow(() => precon.negativeBigNumberJS(-1n));
            shouldThrow(() => precon.negativeBigNumberJS(new BigNumber(1)));
            shouldThrow(() => precon.negativeBigNumberJS(true));
            shouldThrow(() => precon.negativeBigNumberJS(false));
            shouldThrow(() => precon.negativeBigNumberJS({}));
            shouldThrow(() => precon.negativeBigNumberJS(null));
            shouldThrow(() => precon.negativeBigNumberJS(undefined));
        });
    });

    describe('opt_negativeBigNumberJS precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_negativeBigNumberJS(null);
            precon.opt_negativeBigNumberJS(undefined);
        });

        it('should pass if argument is a negative BigNumber', () => {
            precon.opt_negativeBigNumberJS(new BigNumber(0));
            precon.opt_negativeBigNumberJS(new BigNumber(-10));
        });

        it('should throw if argument is not a negative BigNumber', () => {
            shouldThrow(() => precon.opt_negativeBigNumberJS('string'));
            shouldThrow(() => precon.opt_negativeBigNumberJS(1));
            shouldThrow(() => precon.opt_negativeBigNumberJS(1n));
            shouldThrow(() => precon.opt_negativeBigNumberJS(-1));
            shouldThrow(() => precon.opt_negativeBigNumberJS(-1n));
            shouldThrow(() => precon.opt_negativeBigNumberJS(new BigNumber(1)));
            shouldThrow(() => precon.opt_negativeBigNumberJS(true));
            shouldThrow(() => precon.opt_negativeBigNumberJS(false));
            shouldThrow(() => precon.opt_negativeBigNumberJS({}));
        });
    });

    describe('negativeInteger precondition', () => {

        it('should pass if argument is a negative integer', () => {
            precon.negativeInteger(0);
            precon.negativeInteger(-10);
        });

        it('should throw if argument is not a negative integer', () => {
            shouldThrow(() => precon.negativeInteger('string'));
            shouldThrow(() => precon.negativeInteger(1));
            shouldThrow(() => precon.negativeInteger(1n));
            shouldThrow(() => precon.negativeInteger(-1.1));
            shouldThrow(() => precon.negativeInteger(true));
            shouldThrow(() => precon.negativeInteger(false));
            shouldThrow(() => precon.negativeInteger({}));
            shouldThrow(() => precon.negativeInteger(null));
            shouldThrow(() => precon.negativeInteger(undefined));
        });
    });

    describe('opt_negativeInteger precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_negativeInteger(null);
            precon.opt_negativeInteger(undefined);
        });

        it('should pass if argument is a negative integer', () => {
            precon.opt_negativeInteger(0);
            precon.opt_negativeInteger(-10);
        });

        it('should throw if argument is not a negative integer', () => {
            shouldThrow(() => precon.opt_negativeInteger('string'));
            shouldThrow(() => precon.opt_negativeInteger(1));
            shouldThrow(() => precon.opt_negativeInteger(1n));
            shouldThrow(() => precon.opt_negativeInteger(-1.1));
            shouldThrow(() => precon.opt_negativeInteger(true));
            shouldThrow(() => precon.opt_negativeInteger(false));
            shouldThrow(() => precon.opt_negativeInteger({}));
        });
    });

    describe('negativeNumber precondition', () => {

        it('should pass if argument is a negative number', () => {
            precon.negativeNumber(0);
            precon.negativeNumber(-10);
            precon.negativeNumber(-10.5);
        });

        it('should throw if argument is not a negative number', () => {
            shouldThrow(() => precon.negativeNumber('string'));
            shouldThrow(() => precon.negativeNumber(1));
            shouldThrow(() => precon.negativeNumber(1n));
            shouldThrow(() => precon.negativeNumber(true));
            shouldThrow(() => precon.negativeNumber(false));
            shouldThrow(() => precon.negativeNumber({}));
            shouldThrow(() => precon.negativeNumber(null));
            shouldThrow(() => precon.negativeNumber(undefined));
        });
    });

    describe('opt_negativeNumber precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_negativeNumber(null);
            precon.opt_negativeNumber(undefined);
        });

        it('should pass if argument is a negative number', () => {
            precon.opt_negativeNumber(0);
            precon.opt_negativeNumber(-10);
            precon.opt_negativeNumber(-10.5);
        });

        it('should throw if argument is not a negative number', () => {
            shouldThrow(() => precon.opt_negativeNumber('string'));
            shouldThrow(() => precon.opt_negativeNumber(1));
            shouldThrow(() => precon.opt_negativeNumber(1n));
            shouldThrow(() => precon.opt_negativeNumber(true));
            shouldThrow(() => precon.opt_negativeNumber(false));
            shouldThrow(() => precon.opt_negativeNumber({}));
        });
    });

    describe('notNull precondition', () => {

        it('should pass if argument is not null or undefined', () => {
            precon.notNull('string');
            precon.notNull(1);
            precon.notNull(1n);
            precon.notNull(true);
            precon.notNull(false);
            precon.notNull({});
        });

        it('should throw if argument is null or undefined', () => {
            shouldThrow(() => precon.notNull(undefined));
            shouldThrow(() => precon.notNull(null));
        });
    });

    describe('number precondition', () => {

        it('should pass if argument is a number', () => {
            precon.number(0);
            precon.number(10);
            precon.number(10.5);
            precon.number(-10);
            precon.number(-10.5);
        });

        it('should throw if argument is not a number', () => {
            shouldThrow(() => precon.number('string'));
            shouldThrow(() => precon.number(1n));
            shouldThrow(() => precon.number(true));
            shouldThrow(() => precon.number(false));
            shouldThrow(() => precon.number({}));
            shouldThrow(() => precon.number(null));
            shouldThrow(() => precon.number(undefined));
        });
    });

    describe('opt_number precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_number(null);
            precon.opt_number(undefined);
        });

        it('should pass if argument is a number', () => {
            precon.opt_number(0);
            precon.opt_number(10);
            precon.opt_number(10.5);
            precon.opt_number(-10);
            precon.opt_number(-10.5);
        });

        it('should throw if argument is not a number', () => {
            shouldThrow(() => precon.opt_number('string'));
            shouldThrow(() => precon.opt_number(1n));
            shouldThrow(() => precon.opt_number(true));
            shouldThrow(() => precon.opt_number(false));
            shouldThrow(() => precon.opt_number({}));
        });
    });

    describe('obj precondition', () => {

        it('should pass if argument is an object', () => {
            precon.obj({});
        });

        it('should throw if argument is not an object', () => {
            shouldThrow(() => precon.obj('string'));
            shouldThrow(() => precon.obj(1n));
            shouldThrow(() => precon.obj(true));
            shouldThrow(() => precon.obj(false));
            shouldThrow(() => precon.obj(undefined));
        });
    });

    describe('opt_obj precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_obj(null);
            precon.opt_obj(undefined);
        });

        it('should pass if argument is an object', () => {
            precon.opt_obj({});
        });

        it('should throw if argument is not an object', () => {
            shouldThrow(() => precon.opt_obj('string'));
            shouldThrow(() => precon.opt_obj(1n));
            shouldThrow(() => precon.opt_obj(true));
            shouldThrow(() => precon.opt_obj(false));
        });
    });

    describe('oneOf precondition', () => {

        it('should pass if argument is one of specified values', () => {
            precon.oneOf(1, [1, 'a', false]);
            precon.oneOf('a', [1, 'a', false]);
            precon.oneOf(false, [1, 'a', false]);
        });

        it('should throw if argument is not one of specified values', () => {
            shouldThrow(() => precon.oneOf('string', [1, 'a', false]));
            shouldThrow(() => precon.oneOf(2, [1, 'a', false]));
            shouldThrow(() => precon.oneOf(true, [1, 'a', false]));
            shouldThrow(() => precon.oneOf(null, [1, 'a', false]));
            shouldThrow(() => precon.oneOf(undefined, [1, 'a', false]));
        });
    });

    describe('opt_oneOf precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_oneOf(null, [1, 'a', false]);
            precon.opt_oneOf(undefined, [1, 'a', false]);
        });

        it('should pass if argument is one of specified values', () => {
            precon.opt_oneOf(1, [1, 'a', false]);
            precon.opt_oneOf('a', [1, 'a', false]);
            precon.opt_oneOf(false, [1, 'a', false]);
        });

        it('should throw if argument is not one of specified values', () => {
            shouldThrow(() => precon.opt_oneOf('string', [1, 'a', false]));
            shouldThrow(() => precon.opt_oneOf(2, [1, 'a', false]));
            shouldThrow(() => precon.opt_oneOf(true, [1, 'a', false]));
        });
    });

    describe('oneOfInstance precondition', () => {

        it('should pass if argument is one of specified instances', () => {
            function Instance1() {}

            function Instance2() {}

            precon.oneOfInstance(new Instance1(), [Instance1, Instance2]);
            precon.oneOfInstance(new Instance2(), [Instance1, Instance2]);
        });

        it('should throw if argument is not one of specified instances', () => {
            function Instance1() {}

            function Instance2() {}

            function Instance3() {}

            shouldThrow(() => precon.oneOfInstance(new Instance3(), [Instance1, Instance2]));
            shouldThrow(() => precon.oneOfInstance('string', [Instance1, Instance2]));
            shouldThrow(() => precon.oneOfInstance(2, [Instance1, Instance2]));
            shouldThrow(() => precon.oneOfInstance(true, [Instance1, Instance2]));
            shouldThrow(() => precon.oneOfInstance(null, [Instance1, Instance2]));
            shouldThrow(() => precon.oneOfInstance(undefined, [Instance1, Instance2]));
        });
    });

    describe('opt_oneOfInstance precondition', () => {

        it('should pass if argument is null or undefined', () => {
            function Instance1() {}

            function Instance2() {}

            precon.opt_oneOfInstance(null, [Instance1, Instance2]);
            precon.opt_oneOfInstance(undefined, [Instance1, Instance2]);
        });

        it('should pass if argument is one of specified instances', () => {
            function Instance1() {}

            function Instance2() {}

            precon.opt_oneOfInstance(new Instance1(), [Instance1, Instance2]);
            precon.opt_oneOfInstance(new Instance2(), [Instance1, Instance2]);
        });

        it('should throw if argument is not one of specified instances', () => {
            function Instance1() {}

            function Instance2() {}

            function Instance3() {}

            shouldThrow(() => precon.opt_oneOfInstance(new Instance3(), [Instance1, Instance2]));
            shouldThrow(() => precon.opt_oneOfInstance('string', [Instance1, Instance2]));
            shouldThrow(() => precon.opt_oneOfInstance(2, [Instance1, Instance2]));
            shouldThrow(() => precon.opt_oneOfInstance(true, [Instance1, Instance2]));
        });
    });

    describe('oneOfType precondition', () => {

        it('should pass if argument is one of specified types', () => {
            precon.oneOfType(1, ['number', 'string', 'boolean']);
            precon.oneOfType('a', ['number', 'string', 'boolean']);
            precon.oneOfType(false, ['number', 'string', 'boolean']);
        });

        it('should throw if argument is not one of specified types', () => {
            shouldThrow(() => precon.oneOfType(1n, ['number', 'string', 'boolean']));
            shouldThrow(() => precon.oneOfType(new Map(), ['number', 'string', 'boolean']));
            shouldThrow(() => precon.oneOfType(null, ['number', 'string', 'boolean']));
            shouldThrow(() => precon.oneOfType(undefined, ['number', 'string', 'boolean']));
        });
    });

    describe('opt_oneOfType precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_oneOfType(null, ['number', 'string', 'boolean']);
            precon.opt_oneOfType(undefined, ['number', 'string', 'boolean']);
        });

        it('should pass if argument is one of specified types', () => {
            precon.opt_oneOfType(1, ['number', 'string', 'boolean']);
            precon.opt_oneOfType('a', ['number', 'string', 'boolean']);
            precon.opt_oneOfType(false, ['number', 'string', 'boolean']);
        });

        it('should throw if argument is not one of specified types', () => {
            shouldThrow(() => precon.opt_oneOfType(1n, ['number', 'string', 'boolean']));
            shouldThrow(() => precon.opt_oneOfType(new Map(), ['number', 'string', 'boolean']));
        });
    });

    describe('positiveBigNumberJS precondition', () => {

        it('should pass if argument is a positive BigNumber', () => {
            precon.positiveBigNumberJS(new BigNumber(0));
            precon.positiveBigNumberJS(new BigNumber(10));
        });

        it('should throw if argument is not a positive BigNumber', () => {
            shouldThrow(() => precon.positiveBigNumberJS('string'));
            shouldThrow(() => precon.positiveBigNumberJS(1));
            shouldThrow(() => precon.positiveBigNumberJS(1n));
            shouldThrow(() => precon.positiveBigNumberJS(-1));
            shouldThrow(() => precon.positiveBigNumberJS(-1n));
            shouldThrow(() => precon.positiveBigNumberJS(new BigNumber(-1)));
            shouldThrow(() => precon.positiveBigNumberJS(true));
            shouldThrow(() => precon.positiveBigNumberJS(false));
            shouldThrow(() => precon.positiveBigNumberJS({}));
            shouldThrow(() => precon.positiveBigNumberJS(null));
            shouldThrow(() => precon.positiveBigNumberJS(undefined));
        });
    });

    describe('opt_positiveBigNumberJS precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_positiveBigNumberJS(null);
            precon.opt_positiveBigNumberJS(undefined);
        });

        it('should pass if argument is a positive BigNumber', () => {
            precon.opt_positiveBigNumberJS(new BigNumber(0));
            precon.opt_positiveBigNumberJS(new BigNumber(10));
        });

        it('should throw if argument is not a positive BigNumber', () => {
            shouldThrow(() => precon.opt_positiveBigNumberJS('string'));
            shouldThrow(() => precon.opt_positiveBigNumberJS(1));
            shouldThrow(() => precon.opt_positiveBigNumberJS(1n));
            shouldThrow(() => precon.opt_positiveBigNumberJS(-1));
            shouldThrow(() => precon.opt_positiveBigNumberJS(-1n));
            shouldThrow(() => precon.opt_positiveBigNumberJS(new BigNumber(-1)));
            shouldThrow(() => precon.opt_positiveBigNumberJS(true));
            shouldThrow(() => precon.opt_positiveBigNumberJS(false));
            shouldThrow(() => precon.opt_positiveBigNumberJS({}));
        });
    });

    describe('positiveInteger precondition', () => {

        it('should pass if argument is a positive integer', () => {
            precon.positiveInteger(0);
            precon.positiveInteger(10);
        });

        it('should throw if argument is not a positive integer', () => {
            shouldThrow(() => precon.positiveInteger('string'));
            shouldThrow(() => precon.positiveInteger(-1));
            shouldThrow(() => precon.positiveInteger(1n));
            shouldThrow(() => precon.positiveInteger(-1.1));
            shouldThrow(() => precon.positiveInteger(true));
            shouldThrow(() => precon.positiveInteger(false));
            shouldThrow(() => precon.positiveInteger({}));
            shouldThrow(() => precon.positiveInteger(null));
            shouldThrow(() => precon.positiveInteger(undefined));
        });
    });

    describe('opt_positiveInteger precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_positiveInteger(null);
            precon.opt_positiveInteger(undefined);
        });

        it('should pass if argument is a positive integer', () => {
            precon.opt_positiveInteger(0);
            precon.opt_positiveInteger(10);
        });

        it('should throw if argument is not a positive integer', () => {
            shouldThrow(() => precon.opt_positiveInteger('string'));
            shouldThrow(() => precon.opt_positiveInteger(-1));
            shouldThrow(() => precon.opt_positiveInteger(1n));
            shouldThrow(() => precon.opt_positiveInteger(-1.1));
            shouldThrow(() => precon.opt_positiveInteger(true));
            shouldThrow(() => precon.opt_positiveInteger(false));
            shouldThrow(() => precon.opt_positiveInteger({}));
        });
    });

    describe('positiveNumber precondition', () => {

        it('should pass if argument is a positive number', () => {
            precon.positiveNumber(0);
            precon.positiveNumber(10);
            precon.positiveNumber(10.5);
        });

        it('should throw if argument is not a positive number', () => {
            shouldThrow(() => precon.positiveNumber('string'));
            shouldThrow(() => precon.positiveNumber(-1));
            shouldThrow(() => precon.positiveNumber(-1.1));
            shouldThrow(() => precon.positiveNumber(1n));
            shouldThrow(() => precon.positiveNumber(true));
            shouldThrow(() => precon.positiveNumber(false));
            shouldThrow(() => precon.positiveNumber({}));
            shouldThrow(() => precon.positiveNumber(null));
            shouldThrow(() => precon.positiveNumber(undefined));
        });
    });

    describe('opt_negativeNumber precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_positiveNumber(null);
            precon.opt_positiveNumber(undefined);
        });

        it('should pass if argument is a positive number', () => {
            precon.opt_positiveNumber(0);
            precon.opt_positiveNumber(10);
            precon.opt_positiveNumber(10.5);
        });

        it('should throw if argument is not a positive number', () => {
            shouldThrow(() => precon.opt_positiveNumber('string'));
            shouldThrow(() => precon.opt_positiveNumber(-1));
            shouldThrow(() => precon.opt_positiveNumber(-1.1));
            shouldThrow(() => precon.opt_positiveNumber(1n));
            shouldThrow(() => precon.opt_positiveNumber(true));
            shouldThrow(() => precon.opt_positiveNumber(false));
            shouldThrow(() => precon.opt_positiveNumber({}));
        });
    });

    describe('set precondition', () => {

        it('should pass if argument is a set', () => {
            precon.set(new Set());
        });

        it('should throw if argument is not a set', () => {
            shouldThrow(() => precon.set('string'));
            shouldThrow(() => precon.set(1.1));
            shouldThrow(() => precon.set(-1.1));
            shouldThrow(() => precon.set(true));
            shouldThrow(() => precon.set(false));
            shouldThrow(() => precon.set({}));
            shouldThrow(() => precon.set(null));
            shouldThrow(() => precon.set(undefined));
        });
    });

    describe('opt_set precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_set(null);
            precon.opt_set(undefined);
        });

        it('should pass if argument is a set', () => {
            precon.opt_set(new Set());
        });

        it('should throw if argument is not a set', () => {
            shouldThrow(() => precon.opt_set('string'));
            shouldThrow(() => precon.opt_set(1.1));
            shouldThrow(() => precon.opt_set(-1.1));
            shouldThrow(() => precon.opt_set(true));
            shouldThrow(() => precon.opt_set(false));
            shouldThrow(() => precon.opt_set({}));
        });
    });

    describe('string precondition', () => {

        it('should pass if argument is a string', () => {
            precon.string('string');
        });

        it('should throw if argument is not a string', () => {
            shouldThrow(() => precon.string(1));
            shouldThrow(() => precon.string(-1));
            shouldThrow(() => precon.string(true));
            shouldThrow(() => precon.string(false));
            shouldThrow(() => precon.string({}));
            shouldThrow(() => precon.string(null));
            shouldThrow(() => precon.string(undefined));
        });
    });

    describe('opt_string precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_string(null);
            precon.opt_string(undefined);
        });

        it('should pass if argument is a string', () => {
            precon.opt_string('string');
        });

        it('should throw if argument is not a string', () => {
            shouldThrow(() => precon.opt_string(1));
            shouldThrow(() => precon.opt_string(-1));
            shouldThrow(() => precon.opt_string(true));
            shouldThrow(() => precon.opt_string(false));
            shouldThrow(() => precon.opt_string({}));
        });
    });

    describe('undef precondition', () => {

        it('should pass if argument not defined', () => {
            precon.undef(undefined);
        });

        it('should throw if argument is defined', () => {
            shouldThrow(() => precon.undef(null));
            shouldThrow(() => precon.undef('string'));
            shouldThrow(() => precon.undef(1));
            shouldThrow(() => precon.undef(0));
            shouldThrow(() => precon.undef(false));
            shouldThrow(() => precon.undef(true));
        });
    });
});


function shouldThrow(fn) {
    try {
        fn();
    }
    catch (err) {
        if (err instanceof precon.PreconError)
            return;

        throw err;
    }

    throw new Error('PreconError exception expected.');
}