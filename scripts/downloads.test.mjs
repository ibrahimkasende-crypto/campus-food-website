import test from "node:test";
import assert from "node:assert/strict";
import {
  GOOGLE_PLAY_LISTING_URL,
  androidTestJoinUrl,
  closedTestOptInUrl,
  googlePlayUrl,
} from "../src/lib/downloads.ts";

const PLAY = "https://play.google.com/store/apps/details?id=cd.campusfood.app";

test("liens Android : fiche officielle, test fermé seulement si l'adresse https est configurée", () => {
  const previousPlay = process.env.NEXT_PUBLIC_ANDROID_PLAY_URL;
  const previousTest = process.env.NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL;
  delete process.env.NEXT_PUBLIC_ANDROID_PLAY_URL;
  delete process.env.NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL;

  try {
    assert.equal(GOOGLE_PLAY_LISTING_URL, PLAY);
    assert.equal(googlePlayUrl(), PLAY);
    assert.equal(closedTestOptInUrl(), null);
    assert.equal(androidTestJoinUrl(), PLAY);

    process.env.NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL = "http://example.com/test";
    assert.equal(closedTestOptInUrl(), null);
    assert.equal(androidTestJoinUrl(), PLAY);

    process.env.NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL = "https://example.com/test-ferme";
    assert.equal(closedTestOptInUrl(), "https://example.com/test-ferme");
    assert.equal(androidTestJoinUrl(), "https://example.com/test-ferme");
    assert.equal(googlePlayUrl(), PLAY);
  } finally {
    if (previousPlay === undefined) delete process.env.NEXT_PUBLIC_ANDROID_PLAY_URL;
    else process.env.NEXT_PUBLIC_ANDROID_PLAY_URL = previousPlay;
    if (previousTest === undefined) delete process.env.NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL;
    else process.env.NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL = previousTest;
  }
});
