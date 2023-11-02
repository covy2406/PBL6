import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './viewdt.css';
import '../../assets/css/base.css';



const Viewdetails = ({detail, close, setClose}) => {
    return (
        <>
            {
                close ?
                <div className='grid'>
                    <div className='product_detail'>
                        <div className='container'>
                            <button onClick={() => setClose(false)} className='closebtn'><AiOutlineCloseCircle /></button>
                            {
                                detail.map((curElm) => {
                                    return (
                                        <div className='productbox'>
                                            <div className='img-box'>
                                                <img src={curElm.Img} alt={curElm.Title}></img>
                                            </div>
                                            <div className='detail'>
                                                <h4>{curElm.Cat}</h4>
                                                <h2>{curElm.Title}</h2>
                                                <p>A Screen Everyone Will Love: Whether your family is streaming or video chatting with friends tablet A8... </p>
                                                <h3>{curElm.Price}</h3>
                                                <button>Add To Cart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className='productbox'></div> */}
                        </div>
                    </div>
                </div> : null
            }
        </>
    )
}

export default Viewdetails