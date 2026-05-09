import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const QUOTES_URL = "https://maxwrites.com/quotes/quotes.js"

interface Quote {
  category: string
  text: string
  author: string
  source?: string
  sourceUrl?: string
}

// Parses the QUOTES array out of the remote quotes.js file
async function fetchQuotes(): Promise<Quote[]> {
  const res = await fetch(QUOTES_URL)
  const js = await res.text()

  // Extract the QUOTES array literal from the JS source
  const match = js.match(/const QUOTES\s*=\s*(\[[\s\S]*?\]);/)
  if (!match) return []

  // Use Function constructor to safely evaluate just the array literal
  // (no side effects – we only eval the matched array, not the whole file)
  const quotes: Quote[] = new Function(`return ${match[1]}`)()
  return quotes
}

// Module-level cache so we only fetch once per page load
let quotesCache: Quote[] | null = null
let fetchPromise: Promise<Quote[]> | null = null

function getQuotes(): Promise<Quote[]> {
  if (quotesCache) return Promise.resolve(quotesCache)
  if (!fetchPromise) {
    fetchPromise = fetchQuotes().then((q) => {
      quotesCache = q
      return q
    })
  }
  return fetchPromise
}

const StickyNote: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`sticky-note-container ${displayClass ?? ""}`}>
      <div class="sticky-note" id="sticky-note-inner">
        <div class="tape"></div>
        <p class="quote-text" id="sticky-note-quote">Loading quote…</p>
      </div>
    </div>
  )
}

StickyNote.afterDOMLoaded = `
  (async function () {
    const QUOTES_URL = "https://maxwrites.com/quotes/quotes.js";

    async function loadQuote() {
      try {
        const res = await fetch(QUOTES_URL);
        const js = await res.text();

        // Pull out the QUOTES array literal
        const match = js.match(/const QUOTES\\s*=\\s*(\\[[\\s\\S]*?\\]);/);
        if (!match) return;

        const quotes = new Function("return " + match[1])();
        if (!quotes || !quotes.length) return;

        const q = quotes[Math.floor(Math.random() * quotes.length)];

        const el = document.getElementById("sticky-note-quote");
        if (!el) return;

        // Build the display text
        let html = "\\u201C" + q.text + "\\u201D";
        html += "<br><span class='quote-attribution'>\\u2014 " + q.author;
        if (q.source) {
          if (q.sourceUrl) {
            html += ", <a href='" + q.sourceUrl + "' target='_blank' rel='noopener noreferrer'>" + q.source + "</a>";
          } else {
            html += ", <em>" + q.source + "</em>";
          }
        }
        html += "</span>";

        el.innerHTML = html;

        // Optionally color the sticky note by category
        const CATEGORY_COLORS = {
          Systems: "red",
          Ethics: "peach",
          Society: "blue",
          Nature: "green",
          SlowLiving: "yellow",
          Information: "pink",
          Tech: "lavender",
          Writing: "orange",
          Food: "skyblue",
          Ghosts: "grey",
        };
        const color = CATEGORY_COLORS[q.category];
        const noteEl = document.getElementById("sticky-note-inner");
        if (noteEl && color) {
          noteEl.dataset.category = color;
        }
      } catch (err) {
        console.warn("StickyNote: could not load quotes.", err);
      }
    }

    loadQuote();
  })();
`

StickyNote.css = `
  .quote-attribution {
    display: block;
    margin-top: 0.5em;
    font-size: 0.85em;
    opacity: 0.8;
  }
`

export default (() => StickyNote) satisfies QuartzComponentConstructor