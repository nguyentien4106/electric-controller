import React, { useEffect, useState } from 'react'
import DataService from '../lib/DataService'
import { COLLABORATOR_PATH } from '../constant/urls'
import { useNavigate } from 'react-router-dom'

function UseFetchCollaborator(collaboratorId) {
    const [collaborator, setCollaborator] = useState(null)
    const navigate = useNavigate()
    if(collaboratorId === "null"){
        return null
    }
    useEffect(() => {
        DataService.get(COLLABORATOR_PATH.getProfile + collaboratorId)
        .then(res => {
            const { data } = res.data
            setCollaborator(data)
        }).catch(err => {
            navigate("/error")
        })
        
    }, [])
    
    return collaborator;
}

export default UseFetchCollaborator
