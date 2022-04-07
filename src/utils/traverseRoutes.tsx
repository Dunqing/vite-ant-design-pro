import { lazy } from 'react'
import type { RoutesType } from '../types/routes'

export const traverseRoutes = (routes?: RoutesType): RoutesType => {
  return routes?.map((route) => {
    let { component } = route


    if (typeof component === 'string') {
      // remove ./ or ../
      const name = component.replace(/^\.\.?\//, '')
      component = lazy(() => import(`$ROOT/src/pages/${name}.tsx`))
    }

    return {
      ...route,
      component,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
