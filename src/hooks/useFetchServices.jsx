import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataService from '../lib/DataService'
import { SERVICE_PATH } from '../constant/urls'

export default function useFetchServices(hasAll) {
    const [services, setServices] = useState([])
    
    useEffect(() => {
        const fetchServices = async () => {
            const response = await DataService.get(SERVICE_PATH.getAll)
            const { data } = response.data
            const results = data.map(item => ({
                label: item.name,
                value: item.id
            }))

            if(hasAll){
                results.unshift({
                    label: "All",
                    value: -1
                })
            }
            
            setServices(results)
        }

        fetchServices()
    }, [])

    return services;
}
