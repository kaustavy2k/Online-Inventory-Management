import React,{useState} from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  const[year,setyear]=useState(new Date().getFullYear())
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">BSA</a>
        <span className="ml-1">&copy; {year} BSA Internal.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">BSA</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
