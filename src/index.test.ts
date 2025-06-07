import { test, expect, beforeAll } from "bun:test";
import dayjs from "dayjs";
import hebcal from "./index";

beforeAll(() => {
  dayjs.extend(hebcal);
});

test("get jewish date", () => {
  const date = dayjs("2025-06-06").hebcal().format();
  expect(date).toBe("י׳ סיון תשפ״ה");
});

test("check holiday", () => {
  const holidays = dayjs("2025-06-01").hebcal().getHolidays();
  expect(holidays.length).toBe(1);
  expect(holidays[0]).toBe("ערב שבועות");
});

test("check holiday 2", () => {
  const isHoliday = dayjs("2025-06-01").hebcal().isHoliday();
  expect(isHoliday).toBe(true);
});
