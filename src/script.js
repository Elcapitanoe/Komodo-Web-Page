(function () {
  const SOURCES = [
    {
      owner: "Elcapitanoe",
      repo: "Komodo-Build-Prop",
      label: "Komodo-Build-Prop",
    },
    { owner: "Elcapitanoe", repo: "Build-Prop-BETA", label: "Build-Prop-BETA" },
  ];

  function getToken() {
    const meta = document.querySelector('meta[name="gh-token"]');
    return (window.GH_TOKEN || (meta && meta.content) || "").trim();
  }

  async function gh(path, { method = "GET" } = {}) {
    const headers = { Accept: "application/vnd.github+json" };
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
    return fetch(`https://api.github.com${path}`, { method, headers });
  }

  const esc = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  const fmtDate = (s) => {
    try {
      return new Date(s).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return s || "";
    }
  };
  const pad2 = (n) => String(n).padStart(2, "0");
  const tagFromDate = (s) => {
    const d = new Date(s);
    if (isNaN(d)) return "";
    const yy = pad2(d.getFullYear() % 100);
    const mm = pad2(d.getMonth() + 1);
    const dd = pad2(d.getDate());
    return `v${yy}${mm}${dd}`;
  };

  function byPublishedDesc(a, b) {
    const da = new Date(a.published_at || a.created_at);
    const db = new Date(b.published_at || b.created_at);
    return db - da;
  }

  async function fetchAllReleases(owner, repo) {
    let page = 1,
      releases = [];
    while (true) {
      const res = await gh(
        `/repos/${owner}/${repo}/releases?per_page=100&page=${page}`
      );
      if (!res.ok)
        throw new Error(`GitHub /releases ${owner}/${repo} ${res.status}`);
      const chunk = await res.json();
      releases = releases.concat(chunk);
      const link = res.headers.get("Link") || "";
      if (!link.includes('rel="next"')) break;
      page++;
      if (page > 10) break;
    }
    return releases.filter((r) => !r.draft);
  }

  function pickLatest(all) {
    if (!all || all.length === 0) return null;
    const sorted = all.slice().sort(byPublishedDesc);
    return sorted[0] || null;
  }

  function renderLatestBlock(latestRows) {
    if (!latestRows.length) return `<p class="muted">No releases</p>`;
    return latestRows
      .map(({ label, latest }) => {
        const pub = latest.published_at || latest.created_at;
        const tag =
          tagFromDate(pub) || esc(latest.tag_name || latest.name || "Untitled");
        const assets = latest.assets || [];
        const assetsHtml = assets.length
          ? `<ul>` +
            assets
              .map(
                (a) =>
                  `<li><a href="${esc(
                    a.browser_download_url
                  )}" target="_blank" rel="noopener noreferrer">${esc(
                    a.name
                  )}</a> <span class="meta">(${
                    a.download_count ?? 0
                  }x)</span></li>`
              )
              .join("") +
            `</ul>`
          : `<p class="muted">No assets</p>`;
        return `
        <div class="latest">
          <p class="meta"><strong>${esc(tag)} - ${esc(
          fmtDate(pub)
        )}</strong></p>
          ${assetsHtml}
        </div>
      `;
      })
      .join("");
  }

  function renderPreviousAssets(previousRows) {
    const items = [];
    for (const { release } of previousRows) {
      const pub = release.published_at || release.created_at;
      const tag =
        tagFromDate(pub) || release.tag_name || release.name || "Untitled";
      const assets = release.assets || [];
      for (const a of assets) {
        items.push(
          `<li><span class="meta"></span>` +
            `<a href="${esc(
              a.browser_download_url
            )}" target="_blank" rel="noopener noreferrer">${esc(a.name)}</a> ` +
            `<span class="meta">(${a.download_count ?? 0}x)</span></li>`
        );
      }
    }
    return items.length
      ? `<ul>${items.join("")}</ul>`
      : `<p class="muted">No previous builds</p>`;
  }

  async function main() {
    const latestEl = document.getElementById("latestBlock");
    const prevEl = document.getElementById("previousBlock");

    try {
      const datasets = [];
      for (const s of SOURCES) {
        const all = await fetchAllReleases(s.owner, s.repo);
        const latest = pickLatest(all);
        datasets.push({ ...s, all, latest });
      }

      const latestRows = datasets
        .filter((d) => !!d.latest)
        .sort((a, b) => byPublishedDesc(a.latest, b.latest));

      const previousRows = [];
      for (const d of datasets) {
        const skipId = d.latest ? d.latest.id : null;
        for (const rel of d.all) {
          if (skipId && rel.id === skipId) continue;
          previousRows.push({ label: d.label, release: rel });
        }
      }

      previousRows.sort((a, b) => byPublishedDesc(a.release, b.release));

      latestEl.innerHTML = renderLatestBlock(latestRows);
      prevEl.innerHTML = renderPreviousAssets(previousRows);
    } catch (err) {
      const msg = err && err.message ? err.message : String(err);
      latestEl.innerHTML = `<div class="err"><strong>Error:</strong> ${esc(
        msg
      )}</div>`;
      prevEl.innerHTML = "";
    }
  }

  main();
})();
