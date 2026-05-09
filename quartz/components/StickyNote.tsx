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
(function() {
  var script = document.createElement("script");
  script.src = "https://maxwrites.com/quotes/quotes.js";
  script.onload = function() {
    try {
      var quotes = window.QUOTES;
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
    } catch(e) {
      console.warn("StickyNote: could not display quote.", e);
    }
  };
  script.onerror = function(e) {
    console.warn("StickyNote: could not load quotes.", e);
  };
  document.head.appendChild(script);
})();
`

StickyNote.css = ``

export default (() => StickyNote) satisfies QuartzComponentConstructor