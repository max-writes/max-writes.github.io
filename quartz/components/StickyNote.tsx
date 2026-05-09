import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const StickyNote: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`sticky-note-container ${displayClass ?? ""}`}>
      <div class="sticky-note" id="sticky-note-inner">
        <div class="tape"></div>
        <p class="quote-text" id="sticky-note-quote"></p>
      </div>
    </div>
  )
}

StickyNote.afterDOMLoaded = `
fetch("https://maxwrites.com/quotes/quotes.js")
  .then(function(r) { return r.text(); })
  .then(function(src) {
    // Grab just the QUOTES array literal using a split on known boundaries
    var start = src.indexOf("const QUOTES = [");
    var end = src.indexOf("];", start) + 2;
    var arrayLiteral = src.slice(start + "const QUOTES = ".length, end);
    var quotes = eval("(" + arrayLiteral + ")");
    if (!quotes || !quotes.length) return;
    var q = quotes[Math.floor(Math.random() * quotes.length)];
    var el = document.getElementById("sticky-note-quote");
    if (!el) return;
    var text = "\u201C" + q.text + "\u201D";
    if (q.author) {
      text += "<br><span style='display:block;margin-top:0.5em;font-size:0.85em;opacity:0.8'>\u2014 " + q.author;
      if (q.source) text += ", <em>" + q.source + "</em>";
      text += "</span>";
    }
    el.innerHTML = text;
  })
  .catch(function(e) { console.warn("StickyNote fetch failed", e); });
`

StickyNote.css = ``

export default (() => StickyNote) satisfies QuartzComponentConstructor