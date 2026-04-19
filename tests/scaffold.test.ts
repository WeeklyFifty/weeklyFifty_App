// tests/scaffold.test.ts
// Trivial smoke test — proves Jest is wired without forcing real component
// rendering. Tom: replace/expand as Phase B+ adds real units.

describe("scaffold", () => {
  it("runs at all", () => {
    expect(1 + 1).toBe(2);
  });
});
