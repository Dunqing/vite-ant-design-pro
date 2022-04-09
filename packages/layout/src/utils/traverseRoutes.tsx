import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RoutesType } from '../types'

let ComponentKeys: string[] = []
let ComponentMemo: Record<string, any> = {}

export const traverseRoutes = (routes?: RoutesType, clearCache = false): RoutesType => {
  if (clearCache === true) {
    ComponentMemo = {}
    ComponentKeys = []
  }

  return routes?.map((route) => {
    const { redirect } = route
    let { element, component } = route

    if (typeof component === 'string') {
      // remove ./ or ../
      const name = component.replace(/^\.\.?\//, '')

      if (clearCache === true) {
        ComponentMemo = import.meta.glob('$ROOT/**/*.tsx')
        ComponentKeys = Object.keys(ComponentMemo)
      }

      const componentPath = ComponentKeys.find((value) => {
        return [`$ROOT/${name}.tsx`, `$ROOT/${name}.jsx`, `$ROOT/${name}/index.tsx`, `$ROOT/${name}/index.jsx`].includes(value)
      })

      if (componentPath && Reflect.has(ComponentMemo, componentPath))
        component = lazy(ComponentMemo[componentPath])
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
