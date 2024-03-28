import { Helmet } from "react-helmet";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'

export default function Dashboard() {

  return (
    <div>

      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" href={SwiftCargusLogo} type="image/png" />
      </Helmet>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />

      <div > Dashboard </div>
        
    </div>
  )
}
