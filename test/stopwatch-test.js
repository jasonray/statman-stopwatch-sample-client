/*jslint node: true */
"use strict";

const Stopwatch = require("statman-stopwatch");
const defaultPrecision = 15;
const assert = require("assert");
const should = require("should");

//TODO:
//replace with: statman.TestHelper.assertCloseEnough(testtime, delta, defaultPrecision);
function verifyDelta(expected, actual, acceptedconstiance) {
    const lowerThreshold = expected - acceptedconstiance;
    const upperThreshold = expected + acceptedconstiance;
    const message = "Expected " + expected + " ± " + acceptedconstiance + ", was " + actual + ".";
    assert.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}

function verifyIsNull(value) {
    (value === null).should.be.true;
}

describe("stopwatch", function () {
    this.timeout(5000);

    describe("constructor", function () {
        it("w/no params", function () {
            const stopwatch = new Stopwatch();
            should.exist(stopwatch);
            stopwatch.name().should.not.equal(null);
        });

        it("w/name as first param", function () {
            const stopwatch = new Stopwatch("metric-name");
            stopwatch.name().should.equal("metric-name");
        });

    });

    it("start and read (100ms)", function (done) {
        const testtime = 100;

        const stopwatch = new Stopwatch();
        stopwatch.start();
        setTimeout(function () {
            const delta = stopwatch.read();
            verifyDelta(testtime, delta, defaultPrecision);
            done();
        }, testtime);
        stopwatch.prettyPrint();
    });

    it("autostart set to true automatically starts stopwatch", function (done) {
        const testtime = 10;

        const stopwatch = new Stopwatch(true);
        setTimeout(function () {
            const delta = stopwatch.read();
            verifyDelta(testtime, delta, defaultPrecision);
            done();
        }, testtime);
    });
});


