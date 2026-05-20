import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const mockEstudiantes = [
  {
    id: 1,
    username: 'ianO',
    nombre: 'Ian Orellana',
    email: 'ian@ricaldone.edu.sv',
    password: 'contra123'
  },
   {
    id: 1,
    username: 'CarlosM',
    nombre: 'Carlos Quintanilla',
    email: 'carlos@ricaldone.edu.sv',
    password: 'contra321'
  },
   {
    id: 1,
    username: 'AndresE',
    nombre: 'Andres Galvez',
    email: 'andres@ricaldone.edu.sv',
    password: 'contra676'
  },
   {
    id: 1,
    username: 'AlvaoA',
    nombre: 'Alvaro Vasquez',
    email: 'alvaro@ricaldone.edu.sv',
    password: 'FreeFire123'
  },
   {
    id: 1,
    username: 'MarcosT',
    nombre: 'Marcos Torres',
    email: 'marcos@ricaldone.edu.sv',
    password: 'Torres911'
  }
]

const Login = () => {
  const [isRegister, setIsRegister] = useState(false)

  const [username, setUsername] = useState('')
  const [nombre, setNombre] = useState('') 
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('fakestore_token') || sessionStorage.getItem('fakestore_token')
    if (token) {
      navigate('/home')
    }
  }, [navigate])

  const toggleForm = () => {
    setIsRegister(!isRegister)
    setError('')
    setUsername('')
    setNombre('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isRegister) {
        if (!username.trim() || !nombre.trim() || !email.trim() || !password) {
          throw new Error('Por favor completa todos los campos para crear la cuenta.')
        }

        const nuevoEstudiante = {
          id: mockEstudiantes.length + 1,
          username: username.trim(),
          nombre: nombre.trim(),
          email: email.trim(),
          password: password
        }
        mockEstudiantes.push(nuevoEstudiante)
        
        alert('Cuenta de estudiante creada con éxito. Ahora puedes iniciar sesión.')
        toggleForm() 

      } else {
        if (!username.trim() || !password) {
          throw new Error('Por favor completa el username y la contraseña.')
        }

        const user = mockEstudiantes.find(
          (item) => item.username.toLowerCase() === username.trim().toLowerCase() && item.password === password
        )

        if (!user) {
          throw new Error('Username o contraseña incorrectos.')
        }

        const token = `token-${user.id}-${Date.now()}`
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('fakestore_token', token)
        storage.setItem('fakestore_user', user.username)
        storage.setItem('fakestore_email', user.email)

        navigate('/home')
      }
    } catch (error_) {
      setError(error_.message || 'Error en el proceso. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#782315] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-[#6f6965] rounded-[3rem] py-14 px-6 md:px-20 shadow-xl">
        
        <h1 className="text-4xl md:text-5xl font-bold text-[#cba79d] tracking-wide mb-14 uppercase">
          {isRegister ? 'Crear Cuenta Estudiante' : 'BIENVENIDO'}
        </h1>

        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-full md:w-[95%] space-y-5 flex flex-col items-center">
            
            <div className="w-full">
              <label className="block text-xs font-semibold text-[#cba79d] mb-1 ml-4 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
                className="w-full bg-[#b58c82] text-[#42221b] placeholder-[#42221b]/60 text-lg font-medium rounded-full px-8 py-4 focus:outline-none transition duration-200 focus:ring-2 focus:ring-[#310b06]"
                required
              />
            </div>
            {isRegister && (
              <>
                <div className="w-full">
                  <label className="block text-xs font-semibold text-[#cba79d] mb-1 ml-4 uppercase tracking-wider">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    placeholder="nombre"
                    className="w-full bg-[#b58c82] text-[#42221b] placeholder-[#42221b]/60 text-lg font-medium rounded-full px-8 py-4 focus:outline-none transition duration-200 focus:ring-2 focus:ring-[#310b06]"
                    required
                  />
                </div>

                <div className="w-full">
                  <label className="block text-xs font-semibold text-[#cba79d] mb-1 ml-4 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="usuario@dominio.com"
                    className="w-full bg-[#b58c82] text-[#42221b] placeholder-[#42221b]/60 text-lg font-medium rounded-full px-8 py-4 focus:outline-none transition duration-200 focus:ring-2 focus:ring-[#310b06]"
                    required
                  />
                </div>
              </>
            )}
            <div className="w-full">
              <label className="block text-xs font-semibold text-[#cba79d] mb-1 ml-4 uppercase tracking-wider">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="w-full bg-[#b58c82] text-[#42221b] placeholder-[#42221b]/60 text-lg font-medium rounded-full px-8 py-4 focus:outline-none transition duration-200 focus:ring-2 focus:ring-[#310b06]"
                required
              />
            </div>

            {!isRegister && (
              <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-2 text-sm text-[#cba79d]">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-none bg-[#b58c82] text-[#310b06] focus:ring-0 focus:ring-offset-0"
                  />
                  Guardar sesión
                </label>
                <button type="button" className="font-semibold hover:underline text-left">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            {error && (
              <div className="w-full rounded-2xl bg-red-950/50 border border-red-500/30 px-6 py-3 text-sm text-red-200 text-center" role="alert" aria-live="polite">
                {error}
              </div>
            )}

            <div className="w-full h-[2px] bg-[#b58c82] opacity-70 my-4"></div>

            <button
              type="submit"
              disabled={loading}
              className="w-[85%] md:w-[75%] bg-[#310b06] text-[#cba79d] font-bold text-base tracking-widest rounded-full py-4 hover:bg-[#200704] transition-colors disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-500"
            >
              {loading ? 'PROCESANDO...' : isRegister ? 'CREAR CUENTA' : 'CONTINUAR'}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={toggleForm}
                className="text-sm font-semibold text-[#cba79d] hover:underline backend-toggle"
              >
                {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;