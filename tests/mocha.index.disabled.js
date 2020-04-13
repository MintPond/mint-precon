'use strict';

const
    precon = require('./../index'),
    BigNumber = require('bignumber.js');

context('disabled', () => {

    beforeEach(() => {
        precon.enabled = false;
    })

    describe('array precondition', () => {

        it('should always pass', () => {
            precon.array([]);
            precon.array('string');
            precon.array(1);
            precon.array(1n);
            precon.array(true);
            precon.array(false);
            precon.array({});
            precon.array(null);
            precon.array(undefined);
        });
    });

    describe('opt_array precondition', () => {

        it('should always pass', () => {
            precon.opt_array(null, 'array');
            precon.opt_array(undefined, 'array');
            precon.opt_array([], 'array');
            precon.opt_array('string');
            precon.opt_array(1);
            precon.opt_array(1n);
            precon.opt_array(true);
            precon.opt_array(false);
            precon.opt_array({});
        });
    });

    describe('arrayOf precondition', () => {

        it('should always pass', () => {
            precon.arrayOf([], 'string');
            precon.arrayOf(['', 'abc'], 'string');
            precon.arrayOf([], 'number');
            precon.arrayOf([1, 2], 'number');
            precon.arrayOf([], 'boolean');
            precon.arrayOf([true, false], 'boolean');
            precon.arrayOf([1], 'string');
            precon.arrayOf('string', 'string');
        });
    });

    describe('opt_arrayOf precondition', () => {

        it('should always pass', () => {
            precon.opt_arrayOf(null, 'string');
            precon.opt_arrayOf(undefined, 'string');
            precon.opt_arrayOf([], 'string');
            precon.opt_arrayOf([1], 'string');
            precon.opt_arrayOf('string', 'string');
        });
    });

    describe('arrayOfInstance precondition', () => {

        it('should always pass', () => {
            function Instance() {}

            precon.arrayOfInstance([], Instance);
            precon.arrayOfInstance([new Instance()], Instance);
            precon.arrayOfInstance([1], Instance);
            precon.arrayOfInstance('string', Instance);
        });
    });

    describe('opt_arrayOfInstance precondition', () => {

        it('should always pass', () => {
            function Instance() {}

            precon.opt_arrayOf(null, 'string');
            precon.opt_arrayOf(undefined, 'string');
            precon.opt_arrayOfInstance([], Instance);
            precon.opt_arrayOfInstance([new Instance()], Instance);
            precon.opt_arrayOfInstance([1], Instance);
            precon.opt_arrayOfInstance('string', Instance);
        });
    });

    describe('base56 precondition', () => {

        it('should always pass', () => {
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz');
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz1');
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0');
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzI');
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzO');
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzl');
            precon.base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzo');
        });
    });

    describe('opt_base56 precondition', () => {

        it('should always pass', () => {
            precon.opt_base56(null);
            precon.opt_base56(undefined);
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz');
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz1');
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0');
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzI');
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzO');
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzl');
            precon.opt_base56('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyzo');
        });
    });

    describe('base58 precondition', () => {

        it('should always pass', () => {
            precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
            precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0');
            precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI');
            precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO');
            precon.base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl');
        });
    });

    describe('opt_base58 precondition', () => {

        it('should always pass', () => {
            precon.opt_base58(null);
            precon.opt_base58(undefined);
            precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
            precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0');
            precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI');
            precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO');
            precon.opt_base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl');
        });
    });

    describe('base64 precondition', () => {

        it('should always pass', () => {
            precon.base64('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+=');
            precon.base64('123');
            precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0');
            precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI');
            precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO');
            precon.base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl');
        });
    });

    describe('opt_base64 precondition', () => {

        it('should pass if argument is null or undefined', () => {
            precon.opt_base64(null);
            precon.opt_base64(undefined);
            precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
            precon.opt_base64('123');
            precon.opt_base64('1234567890=');
            precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0');
            precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzI');
            precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzO');
            precon.opt_base64('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyzl');
        });
    });

    describe('boolean precondition', () => {

        it('should always pass', () => {
            precon.boolean(true);
            precon.boolean(false);
            precon.boolean('string');
            precon.boolean(1);
            precon.boolean(null);
            precon.boolean(undefined);
        });
    });

    describe('opt_boolean precondition', () => {

        it('should always pass', () => {
            precon.opt_boolean(null);
            precon.opt_boolean(undefined);
            precon.opt_boolean(true);
            precon.opt_boolean(false);
            precon.opt_boolean('string');
            precon.opt_boolean(1);
        });
    });

    describe('bigint precondition', () => {

        it('should always pass', () => {
            precon.bigint(1n);
            precon.bigint('string');
            precon.bigint(1);
        });
    });

    describe('opt_bigint precondition', () => {

        it('should always pass', () => {
            precon.opt_bigint(null);
            precon.opt_bigint(undefined);
            precon.opt_bigint(0n);
            precon.opt_bigint('string');
            precon.opt_bigint(1);
        });
    });

    describe('bigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.bigNumberJS(new BigNumber(10));
            precon.bigNumberJS('string');
            precon.bigNumberJS(1);
        });
    });

    describe('opt_bigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.opt_bigNumberJS(null);
            precon.opt_bigNumberJS(undefined);
            precon.opt_bigNumberJS(new BigNumber(5));
            precon.opt_bigNumberJS('string');
            precon.opt_bigNumberJS(1);
        });
    });

    describe('buffer precondition', () => {

        it('should always pass', () => {
            precon.buffer(Buffer.alloc(10));
            precon.buffer('string');
            precon.buffer(1);
        });
    });

    describe('opt_buffer precondition', () => {

        it('should always pass', () => {
            precon.opt_buffer(null);
            precon.opt_buffer(undefined);
            precon.opt_buffer(Buffer.alloc(3));
            precon.opt_buffer('string');
            precon.opt_buffer(1);
        });
    });

    describe('defined precondition', () => {

        it('should always pass', () => {
            precon.defined('string');
            precon.defined(1);
            precon.defined(1n);
            precon.defined(true);
            precon.defined(false);
            precon.defined({});
            precon.defined(null);
            precon.defined(undefined);
        });
    });

    describe('funct precondition', () => {

        it('should always pass', () => {
            precon.funct(function () {});
            precon.funct('string');
            precon.funct(1);
        });
    });

    describe('opt_funct precondition', () => {

        it('should always pass', () => {
            precon.opt_funct(null);
            precon.opt_funct(undefined);
            precon.opt_funct(function () {});
            precon.opt_funct('string');
            precon.opt_funct(1);
        });
    });

    describe('hex precondition', () => {

        it('should always pass', () => {
            precon.hex('1234567890ABCDEF');
            precon.hex('1234567890abcdef');
            precon.hex('123');
            precon.hex('ag');
            precon.hex('ah');
        });
    });

    describe('opt_hex precondition', () => {

        it('should always pass', () => {
            precon.opt_hex(null);
            precon.opt_hex(undefined);
            precon.opt_hex('1234567890ABCDEF');
            precon.opt_hex('1234567890abcdef');
            precon.opt_hex('123');
            precon.opt_hex('ag');
            precon.opt_hex('ah');
        });
    });

    describe('instanceOf precondition', () => {

        it('should always pass', () => {
            function Instance() {}

            precon.instanceOf(new Instance(), Instance);
            precon.instanceOf('string', Instance);
            precon.instanceOf(1, Instance);
        });
    });

    describe('opt_instanceOf precondition', () => {

        it('should always pass', () => {
            function Instance() {}

            precon.opt_instanceOf(null);
            precon.opt_instanceOf(undefined);
            precon.opt_instanceOf(new Instance(), Instance);
            precon.opt_instanceOf('string', Instance);
            precon.opt_instanceOf(1, Instance);
        });
    });

    describe('integer precondition', () => {

        it('should always pass', () => {
            precon.integer(1);
            precon.integer(-1);
            precon.integer('string');
            precon.integer(1.1);
            precon.integer(-1.1);
            precon.integer(true);
        });
    });

    describe('opt_integer precondition', () => {

        it('should always pass', () => {
            precon.opt_integer(null);
            precon.opt_integer(undefined);
            precon.opt_integer(1);
            precon.opt_integer(-1);
            precon.opt_integer('string');
            precon.opt_integer(1.1);
            precon.opt_integer(-1.1);
            precon.opt_integer(true);
        });
    });

    describe('map precondition', () => {

        it('should always pass', () => {
            precon.map(new Map());
            precon.map('string');
            precon.map(1);
            precon.map(-1);
        });
    });

    describe('opt_map precondition', () => {

        it('should always pass', () => {
            precon.opt_map(null);
            precon.opt_map(undefined);
            precon.opt_map(new Map());
            precon.opt_map('string');
            precon.opt_map(1);
            precon.opt_map(-1);
        });
    });

    describe('minMaxBigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.minMaxBigNumberJS(new BigNumber(0), 0, 20);
            precon.minMaxBigNumberJS(new BigNumber(10), 0, 20);
            precon.minMaxBigNumberJS(new BigNumber(20), 0, 20);
            precon.minMaxBigNumberJS(new BigNumber(10), 15, 20);
            precon.minMaxBigNumberJS(new BigNumber(30), 15, 20);
            precon.minMaxBigNumberJS('string', 0, 20);
            precon.minMaxBigNumberJS(1, 0, 20);
            precon.minMaxBigNumberJS(1n, 0, 20);
        });
    });

    describe('opt_minMaxBigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.opt_minMaxBigNumberJS(null, 0, 20);
            precon.opt_minMaxBigNumberJS(undefined, 0, 20);
            precon.opt_minMaxBigNumberJS(new BigNumber(0), 0, 20);
            precon.opt_minMaxBigNumberJS(new BigNumber(10), 0, 20);
            precon.opt_minMaxBigNumberJS(new BigNumber(20), 0, 20);
            precon.opt_minMaxBigNumberJS(new BigNumber(10), 15, 20);
            precon.opt_minMaxBigNumberJS(new BigNumber(30), 15, 20);
            precon.opt_minMaxBigNumberJS('string', 0, 20);
            precon.opt_minMaxBigNumberJS(1, 0, 20);
            precon.opt_minMaxBigNumberJS(1n, 0, 20);
        });
    });

    describe('minMaxInteger precondition', () => {

        it('should always pass', () => {
            precon.minMaxInteger(0, 0, 20);
            precon.minMaxInteger(10, 0, 20);
            precon.minMaxInteger(20, 0, 20);
            precon.minMaxInteger(10, 15, 20);
            precon.minMaxInteger(30, 15, 20);
            precon.minMaxInteger('string', 0, 20);
            precon.minMaxInteger(1.1, 0, 20);
            precon.minMaxInteger(1n, 0, 20);
        });
    });

    describe('opt_minMaxInteger precondition', () => {

        it('should always pass', () => {
            precon.opt_minMaxInteger(null, 0, 20);
            precon.opt_minMaxInteger(undefined, 0, 20);
            precon.opt_minMaxInteger(0, 0, 20);
            precon.opt_minMaxInteger(10, 0, 20);
            precon.opt_minMaxInteger(20, 0, 20);
            precon.opt_minMaxInteger(10, 15, 20);
            precon.opt_minMaxInteger(30, 15, 20);
            precon.opt_minMaxInteger('string', 0, 20);
            precon.opt_minMaxInteger(1.1, 0, 20);
        });
    });

    describe('minMaxNumber precondition', () => {

        it('should always pass', () => {
            precon.minMaxNumber(0, 0, 20);
            precon.minMaxNumber(10, 0, 20);
            precon.minMaxNumber(10.5, 0, 20);
            precon.minMaxNumber(20, 0, 20);
            precon.minMaxNumber(10, 15, 20);
            precon.minMaxNumber(30, 15, 20);
            precon.minMaxNumber('string', 0, 20);
            precon.minMaxNumber(1n, 0, 20);
        });
    });

    describe('opt_minMaxNumber precondition', () => {

        it('should always pass', () => {
            precon.opt_minMaxNumber(null, 0, 20);
            precon.opt_minMaxNumber(undefined, 0, 20);
            precon.opt_minMaxNumber(0, 0, 20);
            precon.opt_minMaxNumber(10, 0, 20);
            precon.opt_minMaxNumber(10.5, 0, 20);
            precon.opt_minMaxNumber(20, 0, 20);
            precon.opt_minMaxNumber(10, 15, 20);
            precon.opt_minMaxNumber(30, 15, 20);
            precon.opt_minMaxNumber('string', 0, 20);
            precon.opt_minMaxNumber(1n, 0, 20);
        });
    });

    describe('negativeBigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.negativeBigNumberJS(new BigNumber(0));
            precon.negativeBigNumberJS(new BigNumber(-10));
            precon.negativeBigNumberJS('string');
            precon.negativeBigNumberJS(1);
            precon.negativeBigNumberJS(1n);
            precon.negativeBigNumberJS(-1);
            precon.negativeBigNumberJS(new BigNumber(1));
        });
    });

    describe('opt_negativeBigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.opt_negativeBigNumberJS(null);
            precon.opt_negativeBigNumberJS(undefined);
            precon.opt_negativeBigNumberJS(new BigNumber(0));
            precon.opt_negativeBigNumberJS(new BigNumber(-10));
            precon.opt_negativeBigNumberJS('string');
            precon.opt_negativeBigNumberJS(1);
            precon.opt_negativeBigNumberJS(1n);
            precon.opt_negativeBigNumberJS(-1);
            precon.opt_negativeBigNumberJS(new BigNumber(1));
        });
    });

    describe('negativeInteger precondition', () => {

        it('should always pass', () => {
            precon.negativeInteger(0);
            precon.negativeInteger(-10);
            precon.negativeInteger('string');
            precon.negativeInteger(1);
            precon.negativeInteger(1n);
            precon.negativeInteger(-1.1);
            precon.negativeInteger(true);
            precon.negativeInteger(false);
        });
    });

    describe('opt_negativeInteger precondition', () => {

        it('should always pass', () => {
            precon.opt_negativeInteger(null);
            precon.opt_negativeInteger(undefined);
            precon.opt_negativeInteger(0);
            precon.opt_negativeInteger(-10);
            precon.opt_negativeInteger('string');
            precon.opt_negativeInteger(1);
            precon.opt_negativeInteger(1n);
            precon.opt_negativeInteger(-1.1);
            precon.opt_negativeInteger(true);
            precon.opt_negativeInteger(false);
        });
    });

    describe('negativeNumber precondition', () => {

        it('should always pass', () => {
            precon.negativeNumber(0);
            precon.negativeNumber(-10);
            precon.negativeNumber(-10.5);
            precon.negativeNumber('string');
            precon.negativeNumber(1);
            precon.negativeNumber(1n);
            precon.negativeNumber(true);
            precon.negativeNumber(false);
        });
    });

    describe('opt_negativeNumber precondition', () => {

        it('should always pass', () => {
            precon.opt_negativeNumber(null);
            precon.opt_negativeNumber(undefined);
            precon.opt_negativeNumber(0);
            precon.opt_negativeNumber(-10);
            precon.opt_negativeNumber(-10.5);
            precon.opt_negativeNumber('string');
            precon.opt_negativeNumber(1);
            precon.opt_negativeNumber(1n);
        });
    });

    describe('notNull precondition', () => {

        it('should always pass', () => {
            precon.notNull('string');
            precon.notNull(1);
            precon.notNull(1n);
            precon.notNull(true);
            precon.notNull(false);
            precon.notNull({});
            precon.notNull(undefined);
            precon.notNull(null);
        });
    });

    describe('number precondition', () => {

        it('should always pass', () => {
            precon.number(0);
            precon.number(10);
            precon.number(10.5);
            precon.number(-10);
            precon.number(-10.5);
            precon.number('string');
            precon.number(1n);
            precon.number(true);
        });
    });

    describe('opt_number precondition', () => {

        it('should always pass', () => {
            precon.opt_number(null);
            precon.opt_number(undefined);
            precon.opt_number(0);
            precon.opt_number(10);
            precon.opt_number(10.5);
            precon.opt_number(-10);
            precon.opt_number(-10.5);
            precon.opt_number('string');
            precon.opt_number(1n);
            precon.opt_number(true);
        });
    });

    describe('obj precondition', () => {

        it('should always pass', () => {
            precon.obj({});
            precon.obj('string');
            precon.obj(1n);
            precon.obj(true);
        });
    });

    describe('opt_obj precondition', () => {

        it('should always pass', () => {
            precon.opt_obj(null);
            precon.opt_obj(undefined);
            precon.opt_obj({});
            precon.opt_obj('string');
            precon.opt_obj(1n);
            precon.opt_obj(true);
        });
    });

    describe('oneOf precondition', () => {

        it('should always pass', () => {
            precon.oneOf(1, [1, 'a', false]);
            precon.oneOf('a', [1, 'a', false]);
            precon.oneOf(false, [1, 'a', false]);
            precon.oneOf('string', [1, 'a', false]);
            precon.oneOf(2, [1, 'a', false]);
            precon.oneOf(true, [1, 'a', false]);
        });
    });

    describe('opt_oneOf precondition', () => {

        it('should always pass', () => {
            precon.opt_oneOf(null, [1, 'a', false]);
            precon.opt_oneOf(undefined, [1, 'a', false]);
            precon.opt_oneOf(1, [1, 'a', false]);
            precon.opt_oneOf('a', [1, 'a', false]);
            precon.opt_oneOf(false, [1, 'a', false]);
            precon.opt_oneOf('string', [1, 'a', false]);
            precon.opt_oneOf(2, [1, 'a', false]);
            precon.opt_oneOf(true, [1, 'a', false]);
        });
    });

    describe('oneOfInstance precondition', () => {

        it('should always pass', () => {
            function Instance1() {}

            function Instance2() {}

            function Instance3() {}

            precon.oneOfInstance(new Instance1(), [Instance1, Instance2]);
            precon.oneOfInstance(new Instance2(), [Instance1, Instance2]);
            precon.oneOfInstance(new Instance3(), [Instance1, Instance2]);
            precon.oneOfInstance('string', [Instance1, Instance2]);
            precon.oneOfInstance(2, [Instance1, Instance2]);
        });
    });

    describe('opt_oneOfInstance precondition', () => {

        it('should always pass', () => {
            function Instance1() {}

            function Instance2() {}

            function Instance3() {}

            precon.opt_oneOfInstance(null, [Instance1, Instance2]);
            precon.opt_oneOfInstance(undefined, [Instance1, Instance2]);
            precon.opt_oneOfInstance(new Instance1(), [Instance1, Instance2]);
            precon.opt_oneOfInstance(new Instance2(), [Instance1, Instance2]);
            precon.opt_oneOfInstance(new Instance3(), [Instance1, Instance2]);
            precon.opt_oneOfInstance('string', [Instance1, Instance2]);
            precon.opt_oneOfInstance(2, [Instance1, Instance2]);
            precon.opt_oneOfInstance(true, [Instance1, Instance2]);
        });
    });

    describe('oneOfType precondition', () => {

        it('should awlays pass', () => {
            precon.oneOfType(1, ['number', 'string', 'boolean']);
            precon.oneOfType('a', ['number', 'string', 'boolean']);
            precon.oneOfType(false, ['number', 'string', 'boolean']);
            precon.oneOfType(1n, ['number', 'string', 'boolean']);
            precon.oneOfType(new Map(), ['number', 'string', 'boolean']);
        });
    });

    describe('opt_oneOfType precondition', () => {

        it('should always pass', () => {
            precon.opt_oneOfType(null, ['number', 'string', 'boolean']);
            precon.opt_oneOfType(undefined, ['number', 'string', 'boolean']);
            precon.opt_oneOfType(1, ['number', 'string', 'boolean']);
            precon.opt_oneOfType('a', ['number', 'string', 'boolean']);
            precon.opt_oneOfType(false, ['number', 'string', 'boolean']);
            precon.opt_oneOfType(1n, ['number', 'string', 'boolean']);
            precon.opt_oneOfType(new Map(), ['number', 'string', 'boolean']);
        });
    });

    describe('positiveBigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.positiveBigNumberJS(new BigNumber(0));
            precon.positiveBigNumberJS(new BigNumber(10));
            precon.positiveBigNumberJS('string');
            precon.positiveBigNumberJS(1);
            precon.positiveBigNumberJS(new BigNumber(-1));
        });
    });

    describe('opt_positiveBigNumberJS precondition', () => {

        it('should always pass', () => {
            precon.opt_positiveBigNumberJS(null);
            precon.opt_positiveBigNumberJS(undefined);
            precon.opt_positiveBigNumberJS(new BigNumber(0));
            precon.opt_positiveBigNumberJS(new BigNumber(10));
            precon.opt_positiveBigNumberJS('string');
            precon.opt_positiveBigNumberJS(1);
            precon.opt_positiveBigNumberJS(new BigNumber(-1));
        });
    });

    describe('positiveInteger precondition', () => {

        it('should always pass', () => {
            precon.positiveInteger(0);
            precon.positiveInteger(10);
            precon.positiveInteger('string');
            precon.positiveInteger(-1);
        });
    });

    describe('opt_positiveInteger precondition', () => {

        it('should always pass', () => {
            precon.opt_positiveInteger(null);
            precon.opt_positiveInteger(undefined);
            precon.opt_positiveInteger(0);
            precon.opt_positiveInteger(10);
            precon.opt_positiveInteger('string');
            precon.opt_positiveInteger(-1);
        });
    });

    describe('positiveNumber precondition', () => {

        it('should always pass', () => {
            precon.positiveNumber(0);
            precon.positiveNumber(10);
            precon.positiveNumber(10.5);
            precon.positiveNumber('string');
            precon.positiveNumber(-1);
            precon.positiveNumber(-1.1);
        });
    });

    describe('opt_negativeNumber precondition', () => {

        it('should always pass', () => {
            precon.opt_positiveNumber(null);
            precon.opt_positiveNumber(undefined);
            precon.opt_positiveNumber(0);
            precon.opt_positiveNumber(10);
            precon.opt_positiveNumber(10.5);
            precon.opt_positiveNumber('string');
            precon.opt_positiveNumber(-1);
            precon.opt_positiveNumber(-1.1);
        });
    });

    describe('set precondition', () => {

        it('should always pass', () => {
            precon.set(new Set());
            precon.set('string');
            precon.set(1.1);
        });
    });

    describe('opt_set precondition', () => {

        it('should always pass', () => {
            precon.opt_set(null);
            precon.opt_set(undefined);
            precon.opt_set(new Set());
            precon.opt_set('string');
            precon.opt_set(1.1);
        });
    });

    describe('string precondition', () => {

        it('should always pass', () => {
            precon.string('string');
            precon.string(1);
            precon.string(-1);
            precon.string(true);
        });
    });

    describe('opt_string precondition', () => {

        it('should always pass', () => {
            precon.opt_string(null);
            precon.opt_string(undefined);
            precon.opt_string('string');
            precon.opt_string(1);
            precon.opt_string(-1);
            precon.opt_string(true);
        });
    });

    describe('undef precondition', () => {

        it('should always pass', () => {
            precon.undef(undefined);
            precon.undef(null);
            precon.undef('string');
        });
    });
});