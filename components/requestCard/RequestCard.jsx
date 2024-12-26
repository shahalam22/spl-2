'use client'
import React from 'react'
import './RequestCard.css'
import Button from '../button/Button';
import SingleRequestPage from '../singleRequestPage/SingleRequestPage';
import RequestForm from '../requestForm/RequestForm';


// variant - viewcard, editcard

function RequestCard({variant, category, condition, exchangeOption, location, title, description}) {
  
  const [showCard, setShowCard] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)

  const showCardDetails = () => {
    setShowCard(true)
  }

  const closeCardDetails = () => {
    setShowCard(false)
  }

  const showEditCard = () => {
    setShowEdit(true)
  }

  const closeEditCard = () => {
    setShowEdit(false)
  }

  return (
    <>
      <div className="card" onClick={showCardDetails}>
        <div className='card-cat'>
          <img src={`/${category}.jpg`} alt={`${category}`} className='card-cat-icon'/>
          <p className='card-cat-text'>{category}</p>
        </div>

        {/* Header */}
        <div className="card-header">
          <img
            src={`/${condition}.jpg`}
            alt="Excahnge Option Icon"
            className="card-header-icon"
          />
          <img
            src={`/${exchangeOption}.jpg`}
            alt="Excahnge Option Icon"
            className="card-header-icon"
          />
        </div>

        {/* Body */}
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>

        {/* Footer */}
        {
          variant === 'viewcard' && (
            <div className="card-view-footer">
              <svg className='card-view-footer-icon' xmlns="http://www.w3.org/2000/svg" height="20" width="18" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              <span className='card-view-footer-text'>{location}</span>
            </div>
          )
        }

        {
          variant === 'editcard' && (
            <div className="card-edit-footer" onClick={(e) => e.stopPropagation()}>
              <div className='w-[77%]' onClick={showEditCard}>
                <Button variant='black' size='block'>Edit</Button>
              </div>
              <div className='w-[20%]'>
                <Button variant='red' size='block'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='card-edit-footer-icon' height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </Button>
              </div>
            </div>
          )
        }
      </div>
      {
        showCard && <SingleRequestPage onClose={closeCardDetails}/>
      }
      {
        showEdit && <RequestForm onClose={closeEditCard}/>
      }
    </>
  );
}

export default RequestCard




// const cardList = [
//     {
//       category: "office_supply",
//       condition: "used",
//       exchangeOption: "free",
//       location: "Chicago",
//       title: "Carpentry Service",
//       description: "A high-quality product in excellent condition.",
//     },
//     {
//       category: "material",
//       condition: "surplus",
//       exchangeOption: "sale",
//       location: "San Antonio",
//       title: "Vintage Desk Chair",
//       description: "A high-quality product in excellent condition.",
//     },
//     {
//       category: "equipment",
//       condition: "surplus",
//       exchangeOption: "sale",
//       location: "San Antonio",
//       title: "Running Shoes",
//       description: "Affordable and ready for immediate use.",
//     },
//     {
//       category: "cloth",
//       condition: "surplus",
//       exchangeOption: "sale",
//       location: "New York",
//       title: "Construction Material",
//       description: "Lightly used with minimal signs of wear.",
//     },
//   ];