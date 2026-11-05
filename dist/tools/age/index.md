# Age calculator

Canonical page: https://nepocore.com/tools/age/

Calculate Gregorian calendar age between a date of birth and an Age on date. The result shows completed years, remaining months and days, total elapsed days and full weeks. Choose a future or past comparison date on or after the birth date.

## How to use it

1. Enter Date of birth using your browser’s date picker. This tool uses the Gregorian / AD calendar.
2. Set Age on date to today, an application deadline or another date you want to compare.
3. Choose Calculate age. Review the calendar breakdown, total days and full weeks.
4. Check the month-end convention below when the birth date falls on the 29th, 30th or 31st. For an official application, follow the recipient’s stated age rules.

## Example

For a birth date of 15 June 2006 and comparison date of 1 March 2027, the result is 20 years, 8 months and 14 days. The 21st birthday has not yet occurred on that comparison date.

## Limits and checks

The method clamps monthly anniversaries to the last valid day in shorter months. A 29 February birthday therefore reaches its anniversary on 28 February in a non-leap year in this tool. Institutions may use different conventions. BS dates must be converted separately.

## Age on an application deadline

The date a form asks about can be different from today. Enter the exact stated cutoff in Age on date, then read the completed years and the months-and-days breakdown. Changing the deadline by one day can change whether a birthday has occurred.

This result is calendar arithmetic. It does not interpret a school, employer, government or visa rule and should not be presented as proof of eligibility. Read the recipient’s wording and verify any special treatment of leap-day birthdays.

## Check the date convention with examples



| Date of birth | Age on date | Calendar result |
| --- | --- | --- |
| 15 June 2006 | 1 March 2027 | 20 years, 8 months, 14 days |
| 31 January 2026 | 1 March 2026 | 0 years, 1 month, 1 day |
| 29 February 2000 | 28 February 2025 | 25 years, 0 months, 0 days |

## Why total days is a separate result

Calendar months have different lengths, so multiplying years by 365 or months by 30 does not reproduce calendar age. Total days counts the elapsed UTC calendar-day boundaries between the entered dates; the birth date itself is not added as an extra day. Full weeks is that total divided by seven, rounded down.

## Task questions

### Can I find my age on a future date?

Yes. Set Age on date to the date you need. It must be on or after Date of birth. The result uses that date rather than today.

### Does this accept Nepali BS dates?

No. This age calculator expects Gregorian / AD dates. Use the separate BS to AD converter within its supported range, then enter the converted date here.

### Why can another age calculator differ by a day?

Month-end and leap-day conventions can differ. This tool clamps an anniversary to the final valid day of the target month and explains that method in its examples.

## Continue your task

- [Convert a BS date to AD](https://nepocore.com/tools/bs-ad-converter/)
- [Count days between dates](https://nepocore.com/tools/date-difference/)
- [Make a birthday or event countdown](https://nepocore.com/tools/birthday-countdown/)

## Method and references

- [Nepocore: implemented UTC and month-end calculation](https://github.com/Nabi004646/nepocore/blob/main/dist/core.mjs)

## Access and processing

Free to use without an account. Interactive processing requires JavaScript in a modern browser. Input is processed in the browser rather than sent to a processing server. Optional browser storage is not a synchronized account.


---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
