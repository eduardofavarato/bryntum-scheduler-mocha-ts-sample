/* eslint-disable @typescript-eslint/ban-ts-comment */
import "mocha";
import * as chai from "chai";
import { configure, ReactWrapper, ShallowWrapper } from "enzyme";
import * as lodash from "lodash";
import * as sinonLib from "sinon";
import sinonChai from "sinon-chai";
import * as loadStylesheet from "@util/loadStylesheet";
import "jsdom-global/register";
import "source-map-support/register";

declare let global: any;
declare const Proxy: any;
declare let process: { on: (a: string, b: unknown) => void };

export const expect = chai.expect;
export const sinon = sinonLib.createSandbox();
export const sinonMatch = sinonLib.match;

// eslint-disable-next-line @typescript-eslint/no-var-requires
configure({ adapter: new (require("enzyme-adapter-react-16"))() });

(lodash as any).debounce = () => sinon.stub();

process.on("unhandledRejection", (e: unknown) => {
  /* eslint-disable no-console */
  console.error("**** Unhandled rejection in promise: ");
  console.error(e);
});

chai.use(sinonChai);

if (global != null) {
  global.localStorage = {
    setItem: () => {
      /*do nothing*/
    },
    clear: () => {
      /*do nothing*/
    },
  };
}
global.appConfig = () => ({
  faqLinks: {
    goToFaqsLink: "http://istaffing.faq",
  },
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => {
        /*do nothing*/
      },
      removeListener: () => {
        /*do nothing*/
      },
    };
  };

export const mockStylesheet = new Proxy(
  {},
  { get: (obj: any, name: any) => name }
);

sinonLib.stub(loadStylesheet, "loadStylesheet").returns(mockStylesheet);

export function waitForPromises(): Promise<NodeJS.Immediate> {
  return new Promise((resolve) => setImmediate(resolve));
}

export function ensureRender<T extends ReactWrapper | ShallowWrapper>(
  component: T
): Promise<T> {
  return waitForPromises().then(() => component.update()) as Promise<T>;
}
