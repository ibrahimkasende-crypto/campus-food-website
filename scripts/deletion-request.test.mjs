import test from "node:test";
import assert from "node:assert/strict";
import { validateDeletionRequest } from "../src/lib/deletionRequest.ts";

test("e-mail accepté et normalisé", () => {
  const r = validateDeletionRequest("  Ada@CampusFood.APP ", "  je pars  ");
  assert.equal(r.ok, true);
  assert.equal(r.clean.contactKind, "email");
  assert.equal(r.clean.contact, "ada@campusfood.app");
  assert.equal(r.clean.message, "je pars");
});

test("numéro national congolais converti", () => {
  const r = validateDeletionRequest("081 234 5678", "");
  assert.equal(r.ok, true);
  assert.equal(r.clean.contactKind, "phone");
  assert.equal(r.clean.contact, "+243812345678");
  assert.equal(r.clean.message, "");
});

test("contact vide refusé", () => {
  const r = validateDeletionRequest("   ", "bonjour");
  assert.equal(r.ok, false);
  assert.match(r.errors.contact ?? "", /téléphone ou l'adresse e-mail/);
});

test("message trop long refusé", () => {
  const r = validateDeletionRequest("ada@campusfood.app", "a".repeat(2001));
  assert.equal(r.ok, false);
  assert.match(r.errors.message ?? "", /2 000/);
});

test("numéro trop court refusé", () => {
  const r = validateDeletionRequest("123", "");
  assert.equal(r.ok, false);
  assert.match(r.errors.contact ?? "", /numéro/);
});
