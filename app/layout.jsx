import '/app/globals.css'
import '/app/Home.css'
import '/app/map/Map.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        {children}
      </body>
    </html>
  )
}