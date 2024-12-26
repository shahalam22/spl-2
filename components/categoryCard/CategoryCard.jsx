import React from 'react'
import './CategoryCard.css'

function CategoryCard({ category, title }) {
  return (
    <div className='card'>
        <img className='card-image' src={`/${category}.jpg`} alt={category}/>
        <p className='card-text'>{title}</p>
    </div>
  )
}

export default CategoryCard


// const cardList = [
//   {
//     category: "office_supply",
//     title: "Office Supply",
//   },
//   {
//     category: "material",
//     title: "Material",
//   },
//   {
//     category: "equipment",
//     title: "equipment",
//   },
//   {
//     category: "cloth",
//     title: "Cloth",
//   },
// ];