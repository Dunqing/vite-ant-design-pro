import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RoutesType } from '../types/routes'

let ComponentMemo: string[] | null = null

export const traverseRoutes = (routes?: RoutesType, clearCache = false): RoutesType => {
  if (clearCache === true)
    ComponentMemo = null

  return routes?.map((route) => {
    const { redirect } = route
    let { element, component } = route

    if (typeof component === 'string') {
      // remove ./ or ../
      const name = component.replace(/^\.\.?\//, '')

      if (!ComponentMemo)
        ComponentMemo = Object.keys(import.meta.glob('$ROOT/**/*.tsx'))

      const isIndexPage = ComponentMemo.find((value) => {
        return value === `$ROOT/${name}/index.tsx`
      })

      if (isIndexPage)
        component = lazy(() => import(`$ROOT/${name}/index.tsx`))
      else
        component = lazy(() => import(`$ROOT/${name}.tsx`))
    }

    if (redirect !== undefined)
      element = <Navigate replace to={redirect}></Navigate>

    return {
      ...route,
      component,
      element,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}
