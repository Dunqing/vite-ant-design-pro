import Layout from 'virtual:antd-layout'
import Footer from '@/components/Footer'
import { routes } from '@/routes'
import RightContent from '@/components/RightContent'

export default function LayoutWrapper() {
  return <Layout routes={routes} footerRender={() => <Footer />}
    rightContentRender={() => <RightContent />}
  >

  </Layout>
}
