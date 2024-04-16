import React from 'react'

function QuantityField({ name, counter, setCounter, serviceId}) {
  
  return (
    <div>
        <div className='title'> {name} </div>
        <div className='quantity-field'>
            <div className='box'> {counter} </div>
            <div className='buttons-container'>
                <button 
                    style={{ borderTopRightRadius: '5px' }}
                    onClick={() => {
                        if(serviceId === 1)
                        {
                            if(name == 'Weight (kg)' && counter < 29){
                                setCounter(counter + 1)
                            } else if(name == 'Package Nr.'){
                                setCounter(counter + 1)
                            }
                        } else if(serviceId === 2) {
                            setCounter(counter + 1)
                        }
                    }}> + </button>
                
                <button 
                    style={{ borderBottomRightRadius: '5px' }} 
                    onClick={() => {
                        if(serviceId === 1 && counter > 1){
                            setCounter(counter - 1)
                        } else if(serviceId === 2) {
                            if(name == 'Weight (kg)' && counter > 30){
                                setCounter(counter - 1)
                            } else if(name == 'Package Nr.' && counter > 1){
                                setCounter(counter - 1)
                            }
                        } 
                    }}> 
                    - 
                </button>
            </div>
        </div>
    </div>
  )
}

export default QuantityField