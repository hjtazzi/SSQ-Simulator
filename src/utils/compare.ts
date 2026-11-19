import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export const classCombiner = (...inputs: ClassValue[]) =>
  twMerge(clsx(inputs));


export const convertFaDigitsToEn = (str: string): string =>
  str.replace(/[۰-۹]/g, (digit) =>
    String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
  );

export const convertEnDigitsToFa = (str: string): string =>
  str.replace(/[0-9]/g, (digit) =>
    String("۰۱۲۳۴۵۶۷۸۹"[parseInt(digit)])
  );

export const sanitize = (str: string): string =>
  convertFaDigitsToEn(str)
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/_+/g, '_')
    .replace(/-+/g, '-');

