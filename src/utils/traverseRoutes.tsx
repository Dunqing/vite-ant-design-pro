import type { RoutesType } from '../types/routes'

export const traverseRoutes = (routes?: RoutesType): RoutesType => {
  return routes?.map((route) => {
    let element = route.element

    if (element === undefined && route.component) {
      const { component: Component } = route
      element = <Component />
    }

    return {
      ...route,
      element,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
