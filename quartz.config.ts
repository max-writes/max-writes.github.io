import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "max-writes.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Mono",
        body: "Georgia",
        code: "IBM Plex Mono",
      },
      colors: {
  lightMode: {
    light: "#f6f3ea",          // Page background
    lightgray: "#e7e1d6",      // Borders/Bases
    gray: "#b9b1a4",           // Graph links/Metadata
    darkgray: "#5c564f",       // Body text
    dark: "#1c1c1c",           // Headers
    secondary: "#c26d2e",      // Links (Terracotta)
    tertiary: "#6f5a8a",       // Hover states (Muted Purple)
    highlight: "rgba(79,122,92,0.15)", // Internal link background
    textHighlight: "#c26d2e33",
  },
  darkMode: {
    light: "#1b1a19",
    lightgray: "#2a2826",
    gray: "#4a4642",
    darkgray: "#c9c3b8",
    dark: "#f3efe6",
    secondary: "#e28a44",
    tertiary: "#9c86bd",
    highlight: "rgba(120,170,130,0.18)",
    textHighlight: "#e28a4444",
  },
},
},

  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
