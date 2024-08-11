import './css/index.css'
export { Layout }
import React from 'react'
import PropTypes from 'prop-types'
import { childrenPropType } from './PropTypeValues'
import { PageContextProvider } from './usePageContext'
import { Link } from './Link'


Layout.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType
}
function Layout({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Frame>
          <Sidebar>
            <Link className={"hover:text-slate-400 transition-colors duration-300"} href="/">Home</Link>
            <Link className={"hover:text-slate-400 transition-colors duration-300"} href="/login">Login</Link>
          </Sidebar>
          <Content>{children}</Content>
        </Frame>
      </PageContextProvider>
    </React.StrictMode>
  )
}

Frame.propTypes = {
  children: childrenPropType
}
function Frame({ children }) {
  return (
    <div className=' bg-slate-950'>
      {children}
    </div>
  )
}

Sidebar.propTypes = {
  children: childrenPropType
}
function Sidebar({ children }) {
  return (
    <div id="sidebar" className='bg-slate-800 p-2 text-center flex justify-center gap-x-5 text-2xl text-white'>
      {children}
    </div>
  )
}

Content.propTypes = {
  children: childrenPropType
}
function Content({ children }) {
  return (
    <div className='container mx-auto' id="page-container">
      <div id="page-content">
        {children}
      </div>
    </div>
  )
}