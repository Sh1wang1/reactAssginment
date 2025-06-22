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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('https://reactassginment.onrender.com/items')

        setItems(res.data)
      } catch (err) {
        alert('Failed to fetch items from server')
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const handleAddItem = async (newItem) => {
    try {
      const res = await axios.post('https://reactassginment.onrender.com/api/items', newItem);
      setItems((prev) => [res.data, ...prev])
    } catch (err) {
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
