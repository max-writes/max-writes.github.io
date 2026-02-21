import DefaultLayout from "./quartz/layouts/default"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      
      "all content": "/all",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(), // H1
    Component.ContentMeta(),
    Component.ContentList(),
  ],
  left: [
// empty 
  ],
  right: [
    Component.Navigation({
      links: {
        "Now": "/Now",
        "About": "/tags/who-is-max",
        "Home": "/",
      }
    }),
    Component.RecentNotes({ title: "Recent Thoughts 🖋️", limit: 3 }),
    Component.Graph(),
  ],
  afterBody: [
     Component.Breadcrumbs(),
     
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
   beforeBody: [
    Component.ArticleTitle(), // H1
    Component.ContentMeta(),
  ],
  left: [
// empty 
  ],
  right: [
    Component.Navigation({
      links: {
        "Now": "/Now",
        "About": "/tags/who-is-max",
        "Home": "/",
      }
    }),
    Component.RecentNotes({ title: "Recent Thoughts 🖋️", limit: 6 }),
    Component.Graph(),
    Component.Backlinks(),
  ],
    afterBody: [
     Component.Breadcrumbs(),
     Component.StickyNote(), 
  ],
}
