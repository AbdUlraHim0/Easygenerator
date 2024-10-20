/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as NotFoundImport } from './routes/NotFound'

// Create Virtual Routes

const SignUpLazyImport = createFileRoute('/sign-up')()
const SignInLazyImport = createFileRoute('/sign-in')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SignUpLazyRoute = SignUpLazyImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sign-up.lazy').then((d) => d.Route))

const SignInLazyRoute = SignInLazyImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sign-in.lazy').then((d) => d.Route))

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const NotFoundRoute = NotFoundImport.update({
  id: '/NotFound',
  path: '/NotFound',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/NotFound': {
      id: '/NotFound'
      path: '/NotFound'
      fullPath: '/NotFound'
      preLoaderRoute: typeof NotFoundImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInLazyImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/NotFound': typeof NotFoundRoute
  '/dashboard': typeof DashboardRoute
  '/sign-in': typeof SignInLazyRoute
  '/sign-up': typeof SignUpLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/NotFound': typeof NotFoundRoute
  '/dashboard': typeof DashboardRoute
  '/sign-in': typeof SignInLazyRoute
  '/sign-up': typeof SignUpLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/NotFound': typeof NotFoundRoute
  '/dashboard': typeof DashboardRoute
  '/sign-in': typeof SignInLazyRoute
  '/sign-up': typeof SignUpLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/NotFound' | '/dashboard' | '/sign-in' | '/sign-up'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/NotFound' | '/dashboard' | '/sign-in' | '/sign-up'
  id: '__root__' | '/' | '/NotFound' | '/dashboard' | '/sign-in' | '/sign-up'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  NotFoundRoute: typeof NotFoundRoute
  DashboardRoute: typeof DashboardRoute
  SignInLazyRoute: typeof SignInLazyRoute
  SignUpLazyRoute: typeof SignUpLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  NotFoundRoute: NotFoundRoute,
  DashboardRoute: DashboardRoute,
  SignInLazyRoute: SignInLazyRoute,
  SignUpLazyRoute: SignUpLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/NotFound",
        "/dashboard",
        "/sign-in",
        "/sign-up"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/NotFound": {
      "filePath": "NotFound.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.lazy.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
