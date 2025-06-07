# dayjs-hebcal-plugin

Hebcal plugin for Dayjs

```js
dayjs().hebcal().format();
```

## Getting Started

### Installation

```console
bun add dayjs @wyesoftware/dayjs-hebcal-plugin
```

```console
pnpm add dayjs @wyesoftware/dayjs-hebcal-plugin
```

```console
yarn add dayjs @wyesoftware/dayjs-hebcal-plugin
```

### Usage

```js
import dayjs from "dayjs";
import hebcal from "@wyesoftware/dayjs-hebcal-plugin";
dayjs.extend(hebcal);

console.log(dayjs().hebcal().format());
```

## API

### Init

[Optional] use the Israeli schedule for holidays

```ts
dayjs().hebcal(israeli?: boolean); // default false
```

### function isHoliday()

Returns true if date is Hebrew holiday

```js
dayjs().hebcal().isHoliday(); // () => boolean
```

### function getHolidays()

Returns an array of holidays on this date

```js
dayjs().hebcal().getHolidays(); // () => string[]
```

### function format()

Returns formatted Hebrew date (default: "DDD MMM YYY")

```ts
dayjs().hebcal().format(formatStr?: string); // () => string
```

**Supported Formats**

| Format | Output | Description                    |
| ------ | ------ | ------------------------------ |
| DD     | 1-30   | Day of month                   |
| DDD    | כ״ה    | Day of month in Hebrew letters |
| MM     | 1-13   | Month of year                  |
| MMM    | סיון   | Month of year in Hebrew        |
| YY     | 5774   | Year                           |
| YYY    | תשפ״ה  | Year in Hebrew letters         |
