import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Nav from '../components/Nav' 

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('fakestore_token') || sessionStorage.getItem('fakestore_token')
  const user = localStorage.getItem('fakestore_user') || sessionStorage.getItem('fakestore_user') || ''

  const [datosEstudiante, setDatosEstudiante] = useState({
    institucion: "Instituto Técnico Ricaldone",
    especialidad: "Desarrollo de Software",
    materiasInscritas: 5,
    tareasPendientes: 1 
  })

  useEffect(() => {

    if (!token) {
      navigate('/')
    }
  }, [navigate, token])

  const handleLogout = () => {
    
    localStorage.removeItem('fakestore_token')
    localStorage.removeItem('fakestore_user')
    localStorage.removeItem('fakestore_email')
    sessionStorage.removeItem('fakestore_token')
    sessionStorage.removeItem('fakestore_user')
    sessionStorage.removeItem('fakestore_email')
    navigate('/') 
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F4] font-sans">
      
      <div className="bg-[#7A1C04] w-full border-b border-[#5C1503]">
         {token && <Nav />} 
      </div>

      <div className="flex flex-col items-center justify-start flex-grow px-4 md:px-10">
                <header className="text-center mt-12 md:mt-20">
          <h1 className="text-4xl md:text-5xl font-normal text-black mb-4">
            PORTAL ITR
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
            ¡Bienvenido, {user || 'Estudiante'}!
          </h2>
          <p className="mt-1 text-sm md:text-base font-bold text-black tracking-wide">
            {datosEstudiante.institucion} • {datosEstudiante.especialidad}
          </p>
        </header>

        <main className="mt-16 w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          
          <div className="w-full md:w-[350px] h-[200px] bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center p-6">
            <h3 className="text-lg font-bold text-black mb-4">Materias en Curso</h3>
            <p className="text-[80px] leading-none font-black text-black">
              {datosEstudiante.materiasInscritas}
            </p>
          </div>
          <div className="w-full md:w-[350px] h-[200px] bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center p-6">
            <h3 className="text-lg font-bold text-black mb-4">Actividades pendientes</h3>
            <p className="text-[80px] leading-none font-black text-[#CEB150]">
              {datosEstudiante.tareasPendientes}
            </p>
          </div>

        </main>

      
        <div className="mt-16 text-center pb-12">
          <button 
            onClick={handleLogout} 
            className="px-10 py-3 text-white bg-[#7A1C04] rounded-xl hover:bg-[#5C1503] font-bold shadow-md transition duration-200"
          >
            Cerrar sesion
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home;