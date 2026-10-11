// node --test scripts/applink.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { androidIntentUrl, detectPlatform } from "../src/lib/appLink.ts";

test("détection de plateforme", () => {
  assert.equal(detectPlatform("Mozilla/5.0 (Linux; Android 14; TECNO CL6k) Chrome/120 Mobile"), "android");
  assert.equal(detectPlatform("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604"), "ios");
  assert.equal(detectPlatform("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605", 5), "ios"); // iPadOS
  assert.equal(detectPlatform("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605", 0), "desktop");
  assert.equal(detectPlatform("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120"), "desktop");
});

test("lien intent Android : paquet réel, repli encodé, pas de retour vers /commander", () => {
  const u = androidIntentUrl("https://campusfood.app/telechargement");
  assert.match(u, /^intent:\/\/open#Intent;scheme=campusfood;package=cd\.campusfood\.app;/);
  assert.ok(u.includes("S.browser_fallback_url=https%3A%2F%2Fcampusfood.app%2Ftelechargement;end"));
  assert.ok(!u.includes("commander"));
});
