import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete festival homepage and rotating hero", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Festival 2027 · Jashn-e-Hindustan<\/title>/i);
  assert.match(html, /Jashn-e-/);
  assert.match(html, /Hindustan/);
  assert.match(html, /hero-festival-v2-hq\.jpg/);
  assert.match(html, /hero-music-hq\.jpg/);
  assert.match(html, /hero-craft-hq\.jpg/);
  assert.match(html, /hero-dance-mobile-hq\.jpg/);
  assert.match(html, /hero-music-mobile-hq\.jpg/);
  assert.match(html, /hero-craft-mobile-hq\.jpg/);
  assert.match(html, /Hero slide controls/);
  assert.match(html, /Previous hero slide/);
  assert.match(html, /Next hero slide/);
  assert.match(html, /Grand Stage/);
  assert.match(html, /Beyond the Stage/);
});

test("server-renders every public page with its own content", async () => {
  const pages = [
    ["/schedule", /Shape your Jashn/],
    ["/programs-and-sessions", /Many worlds, one garden/],
    ["/visitors-guide", /Arrive curious/],
    ["/faqs", /Questions, answered/],
    ["/partners-supporters", /Made together/],
  ];

  for (const [pathname, title] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, title, pathname);
    assert.match(html, /Jashn-e-/, pathname);
  }
});
