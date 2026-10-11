// Test de la logique du compte à rebours : node --test scripts/countdown.test.mjs (Node ≥ 22.6, types retirés à la volée)
import test from "node:test";
import assert from "node:assert/strict";
import { getCountdownState } from "../src/lib/countdown.ts";

const at = (iso) => Date.parse(iso);

test("avant le 23/10 à 9 h : compte à rebours exact", () => {
  const s = getCountdownState(at("2026-10-22T08:00:00+01:00")); // 25 h avant
  assert.deepEqual(s, { phase: "before", days: 1, hours: 1, minutes: 0, seconds: 0 });
});

test("une seconde avant 9 h 00 : encore 'before' à 1 s", () => {
  const s = getCountdownState(at("2026-10-23T08:59:59+01:00"));
  assert.deepEqual(s, { phase: "before", days: 0, hours: 0, minutes: 0, seconds: 1 });
});

test("à 9 h 00 pile et jusqu'à 23 h 59 : événement commencé, bandeau toujours affiché", () => {
  assert.equal(getCountdownState(at("2026-10-23T09:00:00+01:00")).phase, "live");
  assert.equal(getCountdownState(at("2026-10-23T23:59:59+01:00")).phase, "live");
});

test("à partir du 24/10 à 0 h 00 (Kinshasa) : disparu", () => {
  assert.equal(getCountdownState(at("2026-10-24T00:00:00+01:00")).phase, "ended");
  assert.equal(getCountdownState(at("2027-01-01T00:00:00+01:00")).phase, "ended");
});

test("fuseau : 23:00 UTC le 23/10 = minuit à Kinshasa → disparu", () => {
  assert.equal(getCountdownState(at("2026-10-23T23:00:00Z")).phase, "ended");
  assert.equal(getCountdownState(at("2026-10-23T22:59:59Z")).phase, "live");
});
