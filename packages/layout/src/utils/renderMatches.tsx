import { UNSAFE_RouteContext as RouteContext } from 'react-router-dom'
import type { RouteMatch } from 'react-router-dom'

export function renderMatches(
  matches: RouteMatch[] | null,
  parentMatches: RouteMatch[] = []
): React.ReactElement | null {
  if (matches == null) return null

  return matches.reduceRight((outlet, match, index) => {
    const { element, component: Component } = match.route as any

    if (element === undefined && Component) match.route.element = <Component />

    return (
      <RouteContext.Provider
        value={{
          outlet,
          matches: parentMatches.concat(matches.slice(0, index + 1)),
        }}
      >
        {match.route.element !== undefined ? match.route.element : outlet}
      </RouteContext.Provider>
    )
  }, null as React.ReactElement | null)
}
