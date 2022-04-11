# vite-plugin-antd-layout

Build layouts quickly, like [@umijs/plugin-layout](https://umijs.org/plugins/plugin-layout)

### Example

See [playground](/playground/)


### Usage

#### Install
```
npm install -D vite-plugin-antd-layout

or 

yarn add -D vite-plugin-antd-layout

or 

pnpm add -D vite-plugin-antd-layout
```

#### Use Plugin

```typescript
// vite.config.ts

import react from '@vitejs/plugin-react'
import antdLayout from 'vite-plugin-antd-layout'

export default defineConfig({
  plugins: [react(), antdLayout()],
})
```

#### Use Layout

``` typescript
// entry main.tsx

import Layout from 'virtual:antd-layout'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

// router must be wrapped
ReactDOM.render(
<HashRouter>
  <Layout routes={[]} />
</HashRouter>
)
```

### Dependencies

- react
- react-dom
- antd
- @ant-design/icons
- @ant-design/pro-layout
- react-router-dom
