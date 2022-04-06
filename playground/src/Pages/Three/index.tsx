import { Link, Outlet, useParams } from 'react-router-dom'

export default function Three() {
  const { id } = useParams()

  return <div>
    {id}
    <p><Link replace to={`../${Date.now().toString(36)}`}>下一个</Link></p>
  </div>
}
