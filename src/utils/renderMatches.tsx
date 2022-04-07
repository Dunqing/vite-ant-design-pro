import { RouteMatch, UNSAFE_RouteContext as RouteContext } from "react-router-dom";

export default function renderMatches(
  matches: RouteMatch[] | null,
  parentMatches: RouteMatch[] = []
): React.ReactElement | null {
  if (matches == null) return null;

  return matches.reduceRight((outlet, match, index) => {
    
    let { element, component: Component } = match.route as any

    if (element === undefined && Component) {
      match.route.element = <Component />
    }

    return (
      <RouteContext.Provider
        children={
          match.route.element !== undefined ? match.route.element : outlet
        }
        value={{
          outlet,
          matches: parentMatches.concat(matches.slice(0, index + 1)),
        }}
      />
    );
  }, null as React.ReactElement | null);
}
