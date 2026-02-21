// quartz/components/Navigation.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Navigation({ displayClass, fileData }: QuartzComponentProps) {
    const links = opts?.links ?? {}
    const entries = Object.entries(links)

    return (
      <div className={`navigation ${displayClass ?? ""}`}>
        <ul className="right-nav-inline">
          {entries.map(([text, link], index) => (
            <li key={text}>
              <a href={resolveRelative(fileData.slug!, link as FullSlug)}>{text}</a>
              {/* Add an emoji separator if it's not the last item */}
              {index < entries.length - 1 && <span className="nav-separator">📜</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return Navigation
}) satisfies QuartzComponentConstructor