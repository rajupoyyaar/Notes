import React from 'react'
import { Alert } from 'react-bootstrap'

function Error({variant, children}) {
  return (
    <div>
        <Alert variant={variant}>
          {children}
        </Alert>
    </div>
  )
}

export default Error