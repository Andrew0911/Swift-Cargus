import { Helmet } from "react-helmet";
import ItemsMenu from "../components/ItemsMenu";
import SwiftCargusLogo from '../img/SwiftCargusLogo.png'
import Menu from "../components/Menu";
import Header from "../components/Header";

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

      <div className = "container">
        <Header />
        <div className = "menu-container">
          <ItemsMenu/>
          <Menu />
        </div>
      </div>
    </div>
  )
}
