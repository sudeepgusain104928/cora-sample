import AnnouncementBarConnected from './AnnouncementBarConnected'
import Footer from './Footer'
import Header from './Header'

/**
 * Shared shell used by every page — wraps content with the common
 * announcement bar, header, main landmark, and footer.
 */
export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cora-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <AnnouncementBarConnected />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}
