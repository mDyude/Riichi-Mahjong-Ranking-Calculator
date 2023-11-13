import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton';


const BackButton = ({destination = "/"}) => {
  return (
    <IconButton>
        <Link to={destination}>
            <ArrowBack color='action'/>
        </Link>
    </IconButton>
  )
}

export default BackButton