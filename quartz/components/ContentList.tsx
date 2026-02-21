import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, simplifySlug } from "../util/path"

export default (() => {
  const ContentList: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    // Only render if the frontmatter has our special flag
    if (!fileData.frontmatter?.specialList) {
      return null
    }

    // Filter for files under the 'content' folder (excluding the current page)
    const listItems = allFiles
      .filter((file) => file.slug !== fileData.slug)
      .sort((a, b) => (a.frontmatter?.title || "").localeCompare(b.frontmatter?.title || ""))

    return (
      <div className="content-list">
        <h3>All Thoughts</h3>
        <ul>
          {listItems.map((file) => (
            <li key={file.slug}>
              <a href={simplifySlug(file.slug as FullSlug)}>{file.frontmatter?.title || file.slug}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return ContentList
}) satisfies QuartzComponentConstructor