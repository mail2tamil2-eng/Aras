# Phase 0: UI audit checklist

Do this on the LMS (and Axle Klass / Axle Korp if you can) **before** building ARAS.
The numbers become your "before" baseline. Save results in `guides/baseline-sheet.csv`.

## 1. Count the raw values in code

Run these in the product repo and write down the counts:

```bash
# Unique hex colours
grep -rhoE "#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b" src | sort -u | wc -l

# Arbitrary Tailwind sizes like p-[13px]
grep -rhoE "\[[0-9.]+(px|rem)\]" src | sort -u | wc -l

# Unique font sizes in CSS
grep -rhoE "font-size:\s*[^;]+" src | sort -u | wc -l
```

| Item | Count | Notes |
|---|---|---|
| Unique colours | | |
| Unique font sizes | | |
| Unique spacing values | | |
| Unique border radii | | |
| Unique shadows | | |
| Button styles that look different | | |
| Input styles that look different | | |

## 2. Screenshot inventory

Take screenshots and group them on one board:

- [ ] All buttons
- [ ] All inputs, selects, checkboxes
- [ ] All cards
- [ ] All tables
- [ ] All modals and drawers
- [ ] All empty, loading and error states (note where they are **missing**)

## 3. Accessibility quick scan

On 10 key screens, run the axe browser extension and note:

- [ ] Number of axe violations (serious + critical)
- [ ] Text below 4.5:1 contrast
- [ ] Inputs without labels
- [ ] Icon buttons without names
- [ ] Can you use the whole screen with only the keyboard?

## 4. Process baseline

For 5 recent screens:

- [ ] How many feedback rounds with BA / developers before approval?
- [ ] How many hours from first prompt to approved?
- [ ] How often did AI output need big changes?

## 5. Write the summary

Three to five lines: the biggest problems, with numbers. This is the "Problem" section of your case study.
