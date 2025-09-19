import { Container } from '@radix-ui/themes'
import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
  return (
     <Container>
          {children}
     </Container>
  )
}

export default Layout