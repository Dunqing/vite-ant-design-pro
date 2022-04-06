import { lazy } from 'react'
import type { RoutesType } from '../types/routes'

const Root = '$ROOT'

export const traverseRoutes = (routes?: RoutesType): RoutesType => {
  return routes?.map((route) => {
    let element = route.element
    const { component: Component } = route

    if (element === undefined && Component) {
      if (typeof Component === 'string')
        element = <></>
      else
        element = <Component />
    }

    return {
      ...route,
      element,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
