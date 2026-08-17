import DefaultLayout from "./quartz/layouts/default"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
// import RecentlyModified from "./quartz/components/RecentlyModified"


// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    
    links: {
      
      
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(), // H1
    Component.ContentMeta(),
    Component.ContentList(),
    Component.TagList(),
  ],
  left: [
// empty 
  ],
  right: [
    Component.Navigation({
      links: {
        "🏠 Home": "/",
        "Now": "/Now",
        "Tags": "/tags",
        "Pages" : "/all",
      }
    }),
    Component.RecentNotes({ title: "Recent Thoughts 🖋️", limit: 5 }),
    //RecentlyModified({ title: "Recently Updated ✏️", limit: 5 }),

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
        "🏠 Home": "/",
        "Now": "/Now",
        "Tags": "/tags",
        "Pages": "/all",
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
