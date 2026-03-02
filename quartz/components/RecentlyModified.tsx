import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Date } from "./Date"

interface Options {
  title?: string
  limit?: number
}

export default ((opts?: Options) => {
  const RecentlyModified: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
    const title = opts?.title ?? "Recently Updated"
    const limit = opts?.limit ?? 5

    const sorted = allFiles
      .filter((f) => f.slug !== "index" && f.dates?.modified)
      .sort((a, b) => {
        const aDate = a.dates?.modified ?? a.dates?.created ?? new Date(0)
        const bDate = b.dates?.modified ?? b.dates?.created ?? new Date(0)
        return bDate.getTime() - aDate.getTime()
      })
      .slice(0, limit)

    if (sorted.length === 0) return null

    return (
      <div class="recently-modified">
        <h3>{title}</h3>
        <ul class="recently-modified-ul">
          {sorted.map((file) => (
            <li class="recently-modified-li">
              <a href={`/${file.slug}`} class="internal">
                {file.frontmatter?.title ?? file.slug}
              </a>
              <span class="recently-modified-date">
                <Date date={file.dates!.modified!} locale={cfg.locale} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  RecentlyModified.css = `
    .recently-modified {
      margin-top: 1rem;
    }

    .recently-modified-ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .recently-modified-li {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }

    .recently-modified-li a {
      font-family: var(--font-body);
      color: var(--secondary);
    }

    .recently-modified-date {
      font-family: var(--font-typewriter);
      font-size: 0.75rem;
      color: var(--gray);
      margin-top: 0.1rem;
    }
  `

  return RecentlyModified
}) satisfies QuartzComponentConstructor