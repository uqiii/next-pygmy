import '@styles/globals.css'

import Provider from '@components/Provider'
import Nav from '@components/Nav'
export const metadata = {
  title: "Pygmy",
  description: "A Website by Uqi"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/assets/images/logo.png" />
      </head>

      <body>
        <Provider>
          <div className="main">
            <div className=""/>
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout