# Use a scientific calculator in degrees: sin, powers, logs and factorials

Canonical page: https://nepocore.com/blog/scientific-calculator-degrees-sin-log-factorial/

By Nepocore. Published 2026-11-05; updated 2026-11-05.

Check degree mode, reproduce worked calculations and understand errors before relying on a scientific calculator result.

## Quick answer

Use DEG inputs for trigonometry: sin(30) = 0.5. Group expressions with parentheses, use explicit multiplication and check the displayed expression. tan(90) is undefined; errors can identify a domain or input problem.

## Check the angle unit before entering an expression

An angle without a unit is easy to misinterpret. Nepocore’s scientific calculator uses degrees for sin, cos and tan, and returns degrees for inverse trigonometric functions. Its DEG label is a statement of that behavior. It is not a switch to radians. If your exercise gives an angle in radians, convert the angle deliberately or use a calculator that supports the required unit.

Start with sin(30). The expected answer in degrees is 0.5. In contrast, the JavaScript Math.sin function documented by MDN takes radians; a degree-based interface must account for that difference. A small known example is a useful check when comparing two programs. A result that differs does not by itself establish that either program is broken: first compare angle units and the expression actually entered.

## Make grouping and multiplication explicit

Type the complete expression into the Expression field or build it with the keypad. Use parentheses to show which calculation belongs together. Enter (12 + 8) \* 3 for 60; entering 12 + 8 \* 3 gives 36 because multiplication is evaluated before addition. Both calculations are valid, but they answer different questions.

Use the multiplication key or an explicit \* between values. Keeping multiplication visible makes a saved expression easier to check later. After editing a field, calculate again and read the expression shown with the result. Copying an earlier answer without checking the expression can carry a stale value into your work. The calculator is an arithmetic aid, so write down your assumptions separately when solving a word problem.

## Reproduce a short set of reference calculations

These examples exercise several different controls. Enter each one on its own and compare the result. For the square-root and power examples, the keypad is useful when you do not remember the accepted typed syntax. The More typed functions & examples panel explains additional input forms.

| Expression or keypad operation | Expected result | What it checks |
| --- | --- | --- |
| sin(30) | 0.5 | Degree input |
| cos(60) | 0.5 | Degree input |
| 2^5 | 32 | Exponentiation |
| sqrt(144) | 12 | Square root |
| log(1000) | 3 | Base-10 logarithm |
| 5! | 120 | Factorial |

A small difference at the last displayed digit can come from floating-point arithmetic and display rounding. Nepocore displays up to 12 significant digits. That does not mean the underlying mathematical quantity has only 12 digits, or that an approximate input becomes exact because the output looks precise. Keep sufficient intermediate precision for your task and round the final result according to the exercise or measurement requirements.

## Read a domain error as useful information

Tangent at 90 degrees is undefined. The calculator reports that problem rather than presenting a very large finite approximation as a meaningful answer. Other expressions also have limits: a real square root of a negative number and a logarithm of a non-positive number need a different mathematical domain. This calculator is not a complex-number system.

An error is a reason to inspect the expression, not to delete symbols until a number appears. Check parentheses, angle units, decimal points and the function’s domain. Factorials are bounded to keep calculations practical. Very large or tiny values can be shown in scientific notation; use the notation converter when you need to interpret the exponent.

## Keep percentages, remainders and saved answers distinct

The percent operation divides a value by 100. For a 15% reduction from 1200, enter 1200 \* (1 - 15 / 100), which gives 1020. The mod operation produces a remainder and is not a discount shortcut. Use the percentage calculator when a labeled percent-of or change calculation makes the inputs easier to follow.

Ans refers to the previous answer in the current calculator session. It is convenient for a sequence of operations but is not a permanent notebook or a record synchronized across devices. Record important expressions and independently check results that affect real decisions. These examples explain the tool’s behavior; they do not replace the method, units or reasoning required by your course.

## Put it into practice

- [Scientific calculator](https://nepocore.com/tools/calculator/)
- [Percentage calculator](https://nepocore.com/tools/percentage/)
- [Scientific notation converter](https://nepocore.com/tools/scientific-notation/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [MDN: Math.sin uses radians](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)
- [Nepocore: scientific calculator implementation](https://github.com/Nabi004646/nepocore/blob/main/dist/scientific-core.mjs)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
