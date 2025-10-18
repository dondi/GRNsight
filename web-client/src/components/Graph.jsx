import { useState, useEffect, useContext } from 'react'
import { getDemoWorkbook, getDemoEndpoint } from '../services/api'
import { GrnStateContext } from '../App';
import '../App.css'

export default function Graph() {
    const [workbook, setWorkbook] = useState(null)
    // const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { demoValue } = useContext(GrnStateContext)

    useEffect(() => {
        if (!demoValue) return;
        const demoEndpoint = getDemoEndpoint(demoValue);
        console.log('demoEndpoint:', demoEndpoint)
        // setLoading(true)
        getDemoWorkbook(demoEndpoint)
            .then(data => {
                setWorkbook(data)
                console.log(data)
                // setLoading(false)
            })
            .catch(error => {
                setError(error)
                // setLoading(false)
            })
    }, [demoValue])

    return (
        <div className="grnsight-container"></div>
    )
}