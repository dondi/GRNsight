import { getDemoWorkbook } from '../services/api'
import { useState, useEffect } from 'react'
export default function Graph() {
    const [workbook, setWorkbook] = useState(null)
    // const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // setLoading(true)
        // hardcode demo first
        getDemoWorkbook('test-files/demo-files/15-genes_28-edges_db5_Dahlquist-data_input.xlsx')
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