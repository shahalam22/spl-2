import React from 'react'
import Button from '../button/Button'
import CategoryCard from '../categoryCard/CategoryCard'

const resource_types = ['1','2','3','4','5','6','7']
const resource_type_title = ['Food','Cloth','Equipment','Service','Office Supply','Furniture','Material']

const condition = ['new','used','surplus','expired']

function CategoryPage() {
  return (
    <>
        <div className='my-5'>
            <div className='flex'>
                <div className='flex flex-col text-center md:text-left items-center md:items-start justify-center gap-4 w-[100%] md:w-[60%] p-10'>
                    <h1 className='text-3xl lg:text-5xl font-semibold'>The Resource Network: Share More, Waste Less</h1>
                    <p>The Resource Network is a dynamic portion designed to facilitate the sharing and exchange of resources among users. </p>
                    <Button variant='black' size='md'>Share Resource</Button>
                </div>
                <div className='hidden md:block w-[40%] p-10'>
                    <img className='hidden md:block  rounded-2xl min-h-64' src="/grant1.jpg" alt="resource" />
                </div>
            </div>
            <hr />
            <div>
                <div className='flex flex-col gap-4 p-10 items-center'>
                    <h1 className='text-2xl font-semibold mb-5'>Category</h1>
                    <div className='flex flex-col items-center gap-10 mt-6 mb-10'>
                        <p className='text-lg font-semibold'>Resource Type</p>
                        <div className='flex gap-4 md:gap-10 flex-wrap'>
                            {resource_types.map((type) => (
                                <CategoryCard key={type} category={type} title={resource_type_title[parseInt(type,10)-1]}/>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-10 mb-10'>
                        <p className='text-lg font-semibold'>Condition</p>
                        <div className='flex gap-10 flex-wrap'>
                        {condition.map((type) => (
                            <CategoryCard key={type} category={type} title={type[0].toUpperCase()+type.substring(1,(type.length))}/>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CategoryPage