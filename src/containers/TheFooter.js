import React,{useState} from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  const[year,setyear]=useState(new Date().getFullYear())
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; {year} Online Inventory Management</span>
      </div>
      <div className="mfs-auto">
        <a href="https://www.bppimt.ac.in/" target="_blank" rel="noopener noreferrer">BPPIMT</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
