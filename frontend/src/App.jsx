import { useState } from 'react'
import LandingPage from './LandingPage'
import StudentDashboard from './StudentDashboard'
import RecruiterDashboard from './RecruiterDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  // Render different pages based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />
      case 'student':
        return <StudentDashboard onNavigate={setCurrentPage} />
      case 'recruiter':
        return <RecruiterDashboard onNavigate={setCurrentPage} />
      default:
        return <LandingPage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div>
      {/* Navigation Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-full shadow-lg border-2 border-green-600 px-6 py-3 flex gap-4">
        <button
          onClick={() => setCurrentPage('landing')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            currentPage === 'landing'
              ? 'bg-green-600 text-white'
              : 'bg-white text-green-600 hover:bg-green-50'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage('student')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            currentPage === 'student'
              ? 'bg-green-600 text-white'
              : 'bg-white text-green-600 hover:bg-green-50'
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setCurrentPage('recruiter')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            currentPage === 'recruiter'
              ? 'bg-green-600 text-white'
              : 'bg-white text-green-600 hover:bg-green-50'
          }`}
        >
          Recruiter
        </button>
      </div>

      {/* Current Page */}
      {renderPage()}
    </div>
  )
}

export default App