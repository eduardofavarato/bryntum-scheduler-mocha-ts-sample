import * as lodash from "lodash";
import {loadStylesheet} from "./loadStylesheet";

export type StylesheetType = (...args: InputFnType[]) => {
  className: string;
};

type InputFnType = string | string[] | ConditionalClass | undefined;

type ConditionalClass = {
  [key: string]: boolean | undefined;
};

/**
 * Maps class names to css modules. Accepts a mixed argument list of strings, arrays of strings and
 * conditional maps: {showThisClass: true, dontShowThisClass: false} just like the classnames() utility
 * Usage:
 * const styles = getStylesheet(() => 'Something.scss');
 * <span {...styles('someClass', ['otherClass', 'anotherClass'], {conditionalClass: true})></span>
 */
export const getStylesheet = (func: () => unknown): StylesheetType => {
  const stylesheet = loadStylesheet(func) as Record<string, unknown>;
  return (
    ...args: (
      | string
      | string[]
      | undefined
      | { [key: string]: boolean | undefined }
    )[]
  ): { className: string } => {
    const conditionalsApplied = args.map((obj) => {
      if (typeof obj == "string" || Array.isArray(obj) || obj == null) {
        return obj;
      }
      return Object.keys(obj).map((key) => (obj[key] ? key : undefined));
    });

    const flattened = lodash
      .flatten(conditionalsApplied)
      .filter((f) => f) as string[];

    return {
      className: flattened
        .map((c) => stylesheet[c])
        .join(" ")
        .trim(),
    };
  };
};
