import type { RoutesType } from '../types/routes'

const getLayoutRenderConfig = (currentPathConfig: RoutesType[number]) => {
  const layoutRender: any = {}

  if (currentPathConfig?.hideFooter)
    layoutRender.footerRender = false

  return layoutRender
}

export default getLayoutRenderConfig
