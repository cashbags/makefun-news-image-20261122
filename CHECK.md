# CHECK.md — "Sunday 22 November 2026 in one picture" (news-image-20261122)

What was actually run against this entry, and the numbers each run printed.
All of it was run in this session, against the committed repo, not assumed
from the build.

## The repo and the kit

- Repo `cashbags/makefun-news-image-20261122`, public, created
  2026-11-22T01:06:23Z — after the competition opened (2026-11-22T00:00:00Z).
  License MIT, SPDX-License-Identifier line on top. README carries the
  three make.fun badges and the referral `qrg7fvky` (the account's own code
  is `6sknhk5z`, verified live via /api/me/referrals in an earlier entry,
  used ONLY for bring-the-humans surfaces, never here — user decision
  stands). About + topics set (editorial, makefun, news, news-image) —
  topics via the dedicated set-topics endpoint, since PATCH alone leaves
  them empty; homepage https://make.fun/bounty/news-image-20261122.
- Kit unpacked at `../kit/news-image-20261122-kit` (bundle sha256
  `00314c2cb5a445fd508bab7f92ae6a1a15dec902d84b7c9dcaa326beafe638bb` per
  competition.yaml); the starter's `main.ts` was read, not copied — this
  entry's `main.ts` is written fresh in this session with its own structure
  (PNG signature check plus 1 MiB cap plus byte-length proof, wrapped in a
  deliver helper with a named fail path). No kit starter file was copied.
- Competition verified live before building: $100, entryFeeUsd null (free),
  acceptingSubmissions true, 1,219 submissions at check time, deadline
  2026-11-24T00:00:00Z (07:00 WIB Tue 24 Nov), published
  2026-11-22T00:00:00Z. RULES.txt says the prize is escrowed on Solana
  (escrow 73c7fZatgkE1hpAjW1tR812wyHZEzrK8CPosY1QXLVRW), so the submit step
  will need the entry signed with --keypair; the keypair is on hand.
- Files went up via the GitHub Contents API (push-entry.sh), one commit per
  file — the local git history is not in the repo. SUBMIT THE GITHUB HEAD,
  not any local commit.

## The image: real browser capture, verified from disk

- `node scripts/capture.mjs` (playwright-core, headless Chromium, resolved
  from `~/workspace/makefun/bounties/node_modules`) — the first capture
  failed loudly on purpose: the page overflowed the 1024 px sheet by 196 px
  (capture.mjs measures scrollHeight and refuses an overflowing page).
  Three rounds of trimming followed (smaller masthead and maps, shorter
  decks and briefs, tighter copy): 196 → 23 → 20 → 0 px. Two visual defects
  found by viewing the capture (Gulf-map labels drawn for a taller viewBox
  and clipped; the Bahrain label running past the right edge) and fixed in
  design.html; re-captured.
- Final `entry.png`: 1024×1024, 358,505 bytes, under the 1 MiB cap, sha256
  `b3ef4754be65de40ceb489e998a81c61abe0ed2ae26b52fa01bdae4bf2fd3602`.
  Viewed at full size (masthead, date, lead headline, all eight story
  headlines, both maps, briefs, timeline and strip read; both SVG defects
  gone) and at 300 px across (masthead, date band, lead headline and story
  headlines still read).
- `main.ts` run twice into two directories: byte-identical output, same
  sha256 `b3ef4754…` as entry.png itself.

## Kit check (no transcripts — this session)

- Command: `node cli/makefun.mjs check --kit <kit> --repo <entry>`
  (no --transcripts: no bundle could be written from this session, see
  Transcripts below).
- Result: **(filled in after the run below)**.
- NOTE on the "Entry tree ≤8192 bytes" line: that cap does not apply to this
  competition. The kit's own check reports the snapshot "within the intake's
  caps" (each file at most 100 MiB, repository at most 512 MiB), the
  competition RULES state no 8,192-byte tree cap (that cap belonged to
  tiny-chess), and the news-17/18/19/20/21 entries passed the same check at
  ~275–373 KB. The tree was NOT shrunk to 8,192 bytes: doing so would mean
  dropping entry.png, which is the entry itself.
- At-submission checks (site-side, not yet run): repo_public (repo IS
  public), repo_owner (owner cashbags is the account's GitHub login),
  repo_created_after_open (created 2026-11-22T01:06:23Z, after opening),
  commit_in_repo (submit the GITHUB HEAD, NOT any local commit),
  duplicate_snapshot (all files are this session's own work).

## Transcripts — NOT sealed, parent must re-bundle in a live session

- No bundle was attempted in this session, per the build spec: sealing is
  impossible from this cron-originated run (same root cause as
  news-image-20261120 and news-image-20261121 — the parent chain terminates
  at a scheduler.cron root session that never heard the person type the
  prompt). The entry is NOT sealed.
- Prompt file `prompt-user.txt` holds ONLY the user's verbatim words:
  "Makefun kompetisi baru langsung join". No prompt file with words the
  user did not say was written.
- Fix (parent, after this run): run bundle from the top-level agent in a
  live session once this run completes, with `--session <builder file>
  --no-family --no-discover --muse-usage
  ~/.makefun/muse-usage-news-image-20261122.jsonl` and the same
  harness/prompt/system-prompt flags as the 20261120 seal (system prompt =
  `~/workspace/system/system_prompt.md`, NOT the withheld stub), after
  SELECTing usage rows from muse.db for this builder session and appending
  them to `~/.makefun/muse-usage-news-image-20261122.jsonl`. Then re-run
  the kit check with --transcripts. NOTHING needs rebuilding; the entry,
  repo and image are final.

## News sourcing

Eight feature stories plus 27 briefs plus 3 strip items = 38 stories, each
checked against the day's reporting before it was drawn (see DESIGN.md for
the per-story sourcing and the date check): Iran tanker fleet readied
(report 01:36 UTC Sunday); COP31 talks spill into Sunday overtime;
Wall Street Friday close S&P −3.70%, Nasdaq −5.28%, Nvidia −13.8% on the
SEC report; El Chapo Isidro captured Friday night, confirmed Saturday;
FBI NCIC hack, CNN Friday / AP Saturday; Gaza Saturday, four killed,
truce toll 1,671; Russian ship hit by drones in the Gulf of Finland,
Saturday; Zelensky "fair response" on the Crimean Bridge, Streeting in
Kyiv Saturday; Denmark rapper plot, announced Friday, von der Leyen
condemns Saturday. Cut after checking: Trump "reaches Shenzhen" (he
arrived days earlier), the Kuwait-base strikes (17–18 Nov), the Hormuz
tanker attacks (17 Nov), the "11 killed in Sinaloa" figure (unverified),
Depardieu, the China bomber, the Macklemore single, the UFO footage and
the "20-year Iran deal" line (none datable to 22 November in the reporting
checked).
