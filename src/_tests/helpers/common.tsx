import 'mocha';
import * as chai from 'chai';
import * as sinonLib from 'sinon';
import 'jsdom-global/register';
import 'source-map-support/register';

export const expect = chai.expect;
export const sinon = sinonLib.createSandbox();
