### UPDATE LOG
- 11 DEC 2024
  - Fixed function `getAreaData` in `tableArea` when `insert new line (Enter)` to split one number into two numbers with new line and when switch to `table cell` it's not change `cell's data`
  - Fixed function `switchCell` if `tableArea's data` is only `whitespace` and click `switch` button from `tableArea` to `table cell` it's determine this whitespace to be data which really cannot be counted as data.