import { locale, type FlattenObjectKeys } from "@overextended/ox_lib";

type Locales = FlattenObjectKeys<typeof import("../../locales/en.json")>;

function Locale<T extends Locales>(str: T, ...args: any[]): string;
function Locale<T extends string>(str: T, ...args: any[]): string | unknown;
function Locale<T extends string>(str: T, ...args: any[]) {
  return locale(str, ...args);
}

export default Locale;
