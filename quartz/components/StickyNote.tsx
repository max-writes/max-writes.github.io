import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Add your favorite quotes here!
const quotes = [
  "If your audience is seeking information to solve a problem or answer a question, make sure to address their needs directly. Good writing anticipates and answers the reader's questions. ~ Martha B. Coven",
  "Start and end strong. Keep in mind that no one is required to read your [writing]. You have to grab readers' attention and persuade them to stick with you. ~ Martha B. Coven",
  "Any obstacle between the reader and the information they need is going to make their day worse. ~ Carrie Marshall",
  "All learning professionals are knowledge officers, regularly participating in knowledge management. If you’ve created a step-by-step guide for a process and given it to a work team, if you’ve directed an employee to an operations manual to find an answer to a question, or if you’ve sent an email to explain a procedural change, you were practicing knowledge management. Part of your job always has been finding, organizing, and dispersing organizational information. ~ Christee Gabour Atwood",
  "The 'passing' of time is internal to us, an aspect of our way of seeing the world, not a property of the world itself. ~ Carlo Rovelli",
  "To lose our sense of wonder at the diversity of life and how history has shaped us, is to lose sight of the purpose of life. This is a magical, exciting planet, which has always been full of wonder and it always will be. ~ Terry Breverton"
]

const StickyNote: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div class={`sticky-note-container ${displayClass ?? ""}`}>
      <div class="sticky-note">
        <div class="tape"></div>
        <p class="quote-text">"{randomQuote}"</p>
      </div>
    </div>
  )
}

StickyNote.css = ``

export default (() => StickyNote) satisfies QuartzComponentConstructor