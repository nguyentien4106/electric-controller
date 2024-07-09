import axios from 'axios'
import React, { useEffect, useState } from 'react'

const API_URL = "https://vapi.vnappmob.com/api/province"

export default function useFetchProvinces(hasAll = false) {
    const [provinces, setProvinces] = useState([])
    
    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await axios.get(API_URL)
            const results = response.data.results.map(item => ({
                label: item.province_name,
                value: item.province_name,
                id: item.province_id
            }))

            if(hasAll){
                results.unshift({
                    label: "All",
                    value: "All",
                    id: -1
                })
            }

            setProvinces(results)
        }

        fetchProvinces()
    }, [])

    return provinces;
}
