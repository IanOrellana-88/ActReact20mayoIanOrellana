import { Link } from 'react-router' 

const Nav = () => {
  return (
    <nav className="bg-red-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">Portal Estudiantil Ricaldone</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-200">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/Materias" className="hover:text-gray-200">
              Materias
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;