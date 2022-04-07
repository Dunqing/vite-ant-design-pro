import { lazy } from 'react'
import type { RoutesType } from '../types/routes'

export const traverseRoutes = (routes?: RoutesType): RoutesType => {
  return routes?.map((route) => {
    let { component } = route

    // const matches = import.meta.glob(`../../playground/src/pages/./Welcome.tsx`)
    // console.log("🚀 ~ file: traverseRoutes.tsx ~ line 9 ~ returnroutes?.map ~ matches", matches)

    if (typeof component === 'string')
      component = lazy(() => import(`$ROOT/src/pages/${component}.tsx`))

    return {
      ...route,
      component,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
