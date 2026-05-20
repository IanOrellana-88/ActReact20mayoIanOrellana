import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Nav from '../components/Nav'
import MateriaForm from '../components/MateriaForm'
import ConfirmModal from '../components/ConfirmModal'

const mockMateriasIniciales = [
  {
    id: 1,
    nombre: 'Matemática',
    horas: 6,
    descripcion: 'Estudio general de algebra, calculo basico y matematicas para ingenieria',
    area: 'Área Académica'
  },
  {
    id: 2,
    nombre: 'Ciencias Naturales',
    horas:7,
    descripcion: 'Introducción a los conceptos clave de la fisica, a las ciencias naturales y algebra',
    area: 'Área Académica'
  },
  {
    id: 3,
    nombre: 'MongoDB y Bases de Datos NoSQL',
    horas: 6,
    descripcion: 'Modelado de datos distribuidos, esquemas flexibles, operaciones CRUD avanzadas y optimización de agregaciones.',
    area: 'Área Técnica'
  },
  {
    id: 4,
    nombre: 'Educación Física',
    horas: 7,
    descripcion: 'Desarrollo de habilidades motrices, acondicionamiento fisico general, deportes en equipo y hábitos de vida saludable.',
    area: 'Área Académica'
  },
   {
    id: 5,
    nombre: 'Forma',
    horas: 2,
    descripcion: 'Fromacion cristiana en la Fe',
    area: 'Área Académica'
  }
]

const Materias = () => {
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [areasAcademicas] = useState(['Área Técnica', 'Área Académica', 'Área General'])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const navigate = useNavigate()
  const token = localStorage.getItem('fakestore_token') || sessionStorage.getItem('fakestore_token')

  const materiasFiltradas = materias.filter((materia) => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return true
    return [materia.nombre, materia.descripcion, materia.area]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })

  const totalPages = Math.max(1, Math.ceil(materiasFiltradas.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const materiasActuales = materiasFiltradas.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }

    const cargarMaterias = () => {
      try {
        setMaterias(mockMateriasIniciales)
      } catch (err) {
        setError('No se pudieron cargar las materias académicas.')
      } finally {
        setLoading(false)
      }
    }

    cargarMaterias()
  }, [navigate, token])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleEditarMateria = (materiaId) => {
    setMateriaError('')
    setCargandoDetalleMateria(true)

    const materiaEncontrada = materias.find((m) => m.id === materiaId)
    if (materiaEncontrada) {
      setMateriaEditando(materiaEncontrada)
      setMostrarFormularioMateria(true)
    } else {
      setMateriaError('No se encontró el registro de la materia.')
    }
    setCargandoDetalleMateria(false)
  }

  const handleActualizarMateria = async (formData) => {
    setMateriaError('')
    setMateriaSuccess('')
    setMateriaSubmitting(true)

    try {
      setMaterias((prev) =>
        prev.map((m) =>
          m.id === materiaEditando.id ? { ...m, ...formData, horas: Number(formData.horas) } : m
        )
      )
      setMateriaSuccess('Asignatura actualizada correctamente en el registro.')
      setMostrarFormularioMateria(false)
      setMateriaEditando(null)
    } catch (err) {
      setMateriaError('No se pudo actualizar la asignatura.')
    } finally {
      setMateriaSubmitting(false)
    }
  }

  const handleEliminarMateria = async (materiaId) => {
    setMateriaAEliminar(materiaId)
    setMostrarConfirmacionEliminar(true)
  }

  const confirmarEliminarMateria = async () => {
    if (!materiaAEliminar) return

    setMateriaError('')
    setMateriaSuccess('')
    setMostrarConfirmacionEliminar(false)

    try {
      setMaterias((prev) => prev.filter((m) => m.id !== materiaAEliminar))
      setMateriaSuccess('Materia dada de baja correctamente.')
      setMateriaAEliminar(null)
    } catch (err) {
      setMateriaError('No se pudo dar de baja la asignatura.')
      setMateriaAEliminar(null)
    }
  }

  const cancelarEliminarMateria = () => {
    setMostrarConfirmacionEliminar(false)
    setMateriaAEliminar(null)
  }

  const [mostrarFormularioMateria, setMostrarFormularioMateria] = useState(false)
  const [materiaSubmitting, setMateriaSubmitting] = useState(false)
  const [materiaError, setMateriaError] = useState('')
  const [materiaSuccess, setMateriaSuccess] = useState('')
  const [materiaEditando, setMateriaEditando] = useState(null)
  const [cargandoDetalleMateria, setCargandoDetalleMateria] = useState(false)
  const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false)
  const [materiaAEliminar, setMateriaAEliminar] = useState(null)

  const handleCrearMateria = async (formData) => {
    setMateriaError('')
    setMateriaSuccess('')
    setMateriaSubmitting(true)

    try {
      const nuevaMateria = {
        ...formData,
        id: materias.length > 0 ? Math.max(...materias.map(m => m.id)) + 1 : 1,
        horas: Number(formData.horas)
      }
      setMaterias((prev) => [nuevaMateria, ...(prev || [])])
      setMateriaSuccess(`Asignatura registrada correctamente: ${nuevaMateria.nombre}`)
      setMostrarFormularioMateria(false)
      setMateriaEditando(null)
      setCurrentPage(1)
    } catch (err) {
      setMateriaError('Ocurrió un error al registrar la nueva materia.')
    } finally {
      setMateriaSubmitting(false)
    }
  }

  return (

    
    <div className="bg-[] w-full border-b border-[#5C1503]">
      {token && <Nav />}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Asignaturas</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Total materias</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{materiasFiltradas.length}</p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setMateriaEditando(null)
                    setMostrarFormularioMateria((s) => !s)
                  }}
                  className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Nueva materia
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <label htmlFor="materia-search" className="sr-only">Buscar asignaturas</label>
            <input
              id="materia-search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre de materia, descripción o especialidad"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
        
        {materiaError && <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-rose-700">{materiaError}</div>}
        {materiaSuccess && <div className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-700">{materiaSuccess}</div>}

        {mostrarFormularioMateria && (
          <MateriaForm
            initialData={materiaEditando || {}}
            areasAcademicas={areasAcademicas}
            onSubmit={materiaEditando ? handleActualizarMateria : handleCrearMateria}
            submitting={materiaSubmitting || cargandoDetalleMateria}
            onClose={() => {
              setMostrarFormularioMateria(false)
              setMateriaEditando(null)
            }}
          />
        )}

        <ConfirmModal
          title="Confirmar baja de asignatura"
          message="¿Estás seguro de que deseas eliminar esta materia del plan académico? Esta acción no se puede deshacer."
          isOpen={mostrarConfirmacionEliminar}
          isDangerous={true}
          onConfirm={confirmarEliminarMateria}
          onCancel={cancelarEliminarMateria}
        />

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-100">
            <h2 className="text-lg font-medium text-slate-900">Plan de Estudios Activo</h2>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-500">Cargando asignaturas...</div>
            ) : error ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-6 text-rose-700">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Materia</th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Horas Semanales</th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Descripción General</th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Clasificación</th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {materiasActuales.map((materia) => (
                      <tr key={materia.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 align-top text-sm font-medium text-slate-800 max-w-xl wrap-break-word">{materia.nombre}</td>
                        <td className="px-6 py-4 align-top text-sm font-semibold text-slate-900">{materia.horas} hrs</td>
                        <td className="px-6 py-4 align-top text-sm text-slate-600 max-w-2xl wrap-break-word">{materia.descripcion}</td>
                        <td className="px-6 py-4 align-top text-sm text-slate-700">
                          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">{materia.area}</span>
                        </td>
                        <td className="px-6 py-4 align-top text-sm text-slate-700">
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditarMateria(materia.id)}
                              disabled={cargandoDetalleMateria}
                              className="rounded-xl w-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                            >
                              Editar 
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEliminarMateria(materia.id)}
                              className="rounded-xl w-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-600">
                    Página {currentPage} de {totalPages}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      Anterior
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                            currentPage === page
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}

                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Materias;