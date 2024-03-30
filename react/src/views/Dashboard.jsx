import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'

export default function Dashboard() {

  return (
    <div>

      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <div className='page-header'>Dashboard</div>
      <br/>
        
    </div>
  )
}
