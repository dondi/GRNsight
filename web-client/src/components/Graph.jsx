import { getDemoWorkbook } from '../services/api'
import { useState, useEffect } from 'react'
export default function Graph() {
    const [workbook, setWorkbook] = useState(null)
    // const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // setLoading(true)
        // hardcode demo first
        getDemoWorkbook('unweighted')
            .then(data => {
                setWorkbook(data)
                console.log(data)
                // setLoading(false)
            })
            .catch(error => {
                setError(error)
                // setLoading(false)
            })
    }, [])

    return (
        <div className="grnsight-container"></div>
    )
}