import type { PluginFunc } from "dayjs";
import { getHolidaysOnDate, Locale } from "@hebcal/core";
import {
  greg,
  abs2hebrew,
  gematriya,
  getMonthName,
  Locale as HLocale,
} from "@hebcal/hdate";

declare module "dayjs" {
  interface Dayjs {
    hebcal: (israeli?: boolean) => {
      isHoliday: () => boolean;
      getHolidays: () => string[];
      format: (formatStr?: string) => string;
    };
  }
}

export default (function (o, c) {
  let proto = c.prototype;
  let oldFormat = proto.format;

  proto.hebcal = function (israeli: boolean = false) {
    return {
      isHoliday: () =>
        (getHolidaysOnDate(this.toDate(), !!israeli)?.length ?? 0) > 0,
      getHolidays: () =>
        getHolidaysOnDate(this.toDate(), !!israeli)?.map(
          (h) => Locale.lookupTranslation(h.desc, "he-x-nonikud") ?? h.desc
        ) ?? [],
      format: (formatStr: string = "DDD MMM YYY") => {
        const abs = greg.greg2abs(this.toDate());
        const hdate = abs2hebrew(abs);
        let result = formatStr.replace(
          /\[([^\]]+)]|YYY|YY|MMM|MM|DDD|DD{1,2}|S/g,
          (match: string) => {
            switch (match) {
              case "YYY":
                return gematriya(hdate.yy);
              case "YY":
                return String(hdate.yy);
              case "MMM":
                return (
                  HLocale.lookupTranslation(
                    getMonthName(hdate.mm, hdate.yy),
                    "he-x-nonikud"
                  ) ?? getMonthName(hdate.mm, hdate.yy)
                );
              case "MM":
                return String(hdate.mm);
              case "DDD":
                return gematriya(hdate.dd);
              case "DD":
                return String(hdate.dd);
              default:
                return match;
            }
          }
        );
        return oldFormat.call(this, result);
      },
    };
  };
} as PluginFunc);
