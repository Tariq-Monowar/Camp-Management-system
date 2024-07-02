import { NavLink } from 'react-router-dom'
import './CoppyWrite.css'

const CoppyWrite = () => {
  return (
    <footer className='coppywrite'>
      <span>যেকোন প্রয়োজনে যোগাযোগ করুন অফিস সম্পাদক (০১৯ ২৮০৯ ১৯৭৪) ভাইয়ার সাথে।</span>
      <p>©Copyright 2024; All Rights Reserved By <NavLink to="https://phulkuri.org.bd/" target='blank'>Phulkuri Ashar</NavLink>.</p>
    </footer>
  )
}

export default CoppyWrite