import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RoutesType } from '../types/routes'

export const traverseRoutes = (routes?: RoutesType): RoutesType => {
  return routes?.map((route) => {
    let { element, component, redirect } = route

    if (typeof component === 'string') {
      // remove ./ or ../
      const name = component.replace(/^\.\.?\//, '')
      component = lazy(() => import(`$ROOT/src/pages/${name}.tsx`))
    }

    if (redirect !== undefined) {
      element = <Navigate replace to={redirect}></Navigate>
    }

    return {
      ...route,
      component,
      element,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
