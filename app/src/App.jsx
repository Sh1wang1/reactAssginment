import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ViewItemsPage from './pages/ViewItemsPage'
import AddItemPage from './pages/AddItemPage'
import axios from 'axios'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/items`)
        setItems(res.data)
      } catch (err) {
        console.error('Error fetching items:', err)
        alert('Failed to fetch items from server')
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [API_BASE_URL])

  const handleAddItem = async (newItem) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/items`, newItem);
      setItems((prev) => [res.data, ...prev])
    } catch (err) {
      console.error('Error adding item:', err)
      alert('Failed to add item')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ViewItemsPage items={items} />} />
          <Route path="/add" element={<AddItemPage onAddItem={handleAddItem} />} />
        </Routes>
      </main>
      </div>
  )
}

export default App
