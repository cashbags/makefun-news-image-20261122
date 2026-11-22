# makefun-news-image-20261122

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/cashbags/makefun-news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/cashbags/makefun-news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)

**Sunday 22 November 2026 in one picture** — the world's news of Sunday
22 November 2026, set as a single newspaper front page. The date is the
loudest fact on the page, and 38 stories share it: Iran readying a tanker
fleet to break the US blockade as COP31 spills into Sunday with no deal;
El Chapo Isidro seized in Sinaloa; the FBI probing a hack of its crime
database; four more killed in Gaza as the truce frays; drones hitting a
Russian ship in the Gulf of Finland; Zelensky calling the Crimean Bridge
strikes a fair response; Denmark saying Russia plotted to kill a rapper —
plus a world map, 27 briefs from every continent, a weekend timeline in
UTC, and a strip with a boy's letter to NASA, two planets found by AI, and
Pat Cummins keeping the Test captaincy.

Built with [make.fun](https://make.fun/r/qrg7fvky) — join the competition
and build your own entry.

## The image

`entry.png` is a 1024×1024 PNG made by opening `design.html` in a real
headless Chromium and screenshotting the page — a front page, not a photo
collage. The masthead carries the day in full; the lead story gets a drawn
map of the Gulf with the strait, Kharg Island, Kuwait and Bahrain marked;
the COP31, markets, Mexico, FBI, Gaza, Finland, Kyiv and Denmark stories
each get their own space; every fact on the page was checked against the
day's reporting (Reuters, AP, BBC, CNN, NPR, DW) before it was drawn;
where the reporting itself is dated — the Peru quake on Friday, the
Shenzhen trilateral on Thursday — the page carries the Sunday or Saturday
follow-up, and DESIGN.md says so. See `DESIGN.md` for the sourcing.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# writes out/entry.png — byte-identical on every run
```

## How it is built

- `main.ts` — the entry program (Node 22, standard library only): checks
  `entry.png` opens with the PNG signature and sits under the 1 MiB cap,
  copies it to `/output/entry.png`, and refuses to finish if the copy is
  short by even one byte.
- `design.html` — the front page itself: HTML + inline SVG, every
  illustration drawn from scratch for this entry, no photographs, no copied
  artwork.
- `scripts/capture.mjs` — the capture step: loads `design.html` in headless
  Chromium (playwright-core) and screenshots the page at 1024×1024. Any page
  error or console error fails the run, and any content taller than the
  1024 px sheet fails it too.
- `DESIGN.md` — why the page looks the way it does and where each fact
  comes from, with a date check for every story.
- `CHECK.md` — what was actually run against this entry, and the numbers
  each run printed.

## Verification

Real-browser capture verified from disk (1024×1024, under the 1 MiB cap);
viewed at full size and at 300 pixels across, where the masthead, date
band, lead headline and story headlines still read.
