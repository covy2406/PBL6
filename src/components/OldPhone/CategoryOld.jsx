import React from "react";
import { useState } from "react";
import '../NewProduct/product.css';
import './secondHand.css'
import OldPhoneData from "./oldPhoneData";

const CategoryOld = ({oldData, setOldproduct}) => {

    // const [oldData, setOldproduct] = useState([]);

    // Hàm xử lý lọc sản phẩm:
    const [productBrand, setBrand] = useState('all')
    const handleBrandchange = (event) => {
        const value = event.target.value;
        if (value === 'all') {
            setBrand('all');
            setOldproduct(OldPhoneData);
        }
        else {
            setBrand(value);;
            const filtterproducts = filterProductsByBrand(value);
            setOldproduct(filtterproducts);
        }
    }

    // Hàm lọc sản phẩm theo Brand name:
    const filterProductsByBrand = (productBrand) => {
        switch (productBrand) {
            case 'SamSung':
                return OldPhoneData.filter((product) => product.brand === 'SamSung');
            case 'Apple':
                return OldPhoneData.filter((product) => product.brand === 'Apple');
            case 'Vivo':
                return OldPhoneData.filter((product) => product.brand === 'Vivo');
            case 'Nokia':
                return OldPhoneData.filter((product) => product.brand === 'Nokia');
            case 'Oppo':
                return OldPhoneData.filter((product) => product.brand === 'Oppo');
            case 'Realmi':
                return OldPhoneData.filter((product) => product.brand === 'Realmi');
            case 'Xiaomi':
                return OldPhoneData.filter((product) => product.brand === 'Xiaomi');
            case 'Huawei':
                return OldPhoneData.filter((product) => product.brand === 'Huawei');
            default:
                return OldPhoneData;
        }
    }

    // Hàm xử lý lọc giá:
    const [priceRange, setPrice] = useState('all');
    const handlePriceChange = (event) => {
        const value = event.target.value;

        if (value === 'all') {
            setPrice('all');
            setOldproduct(OldPhoneData);
        } else {
            setPrice(value);
            const filteredProducts = filterProductsByPrice(value);
            setOldproduct(filteredProducts);
        }
    };

    // Hàm lọc sản phẩm theo mức giá:
    const filterProductsByPrice = (priceRange) => {
        switch (priceRange) {
            case '0-2':
                return OldPhoneData.filter((product) => product.price <= 2000000);
            case '2-4':
                return OldPhoneData.filter((product) => product.price > 2000000 && product.price <= 4000000);
            case '4-7':
                return OldPhoneData.filter((product) => product.price > 4000000 && product.price <= 7000000);
            case '7-13':
                return OldPhoneData.filter((product) => product.price > 7000000 && product.price <= 13000000);
            case '13+':
                return OldPhoneData.filter((product) => product.price > 13000000);
            default:
                return OldPhoneData;
        }
    }

    return (
        <div className='grid__column-2'>
            {/* CATEGORYOld CHO TÊN BRAND */}

            <nav className='categories'>
                <ul className='categories-list'>
                    <h3 className='categories__heading'>Thương hiệu</h3>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'all'} value='all'></input>
                        <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                    </li>

                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'SamSung'} value='SamSung'></input>
                        <label className='categories-item__label' htmlFor='SamSung'>SamSung</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'Apple'} value='Apple'></input>
                        <label className='categories-item__label' htmlFor='Apple'>Apple</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'Xiaomi'} value='Xiaomi'></input>
                        <label className='categories-item__label' htmlFor='Xiaomi'>Xiaomi</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'Huawei'} value='Huawei'></input>
                        <label className='categories-item__label' htmlFor='Huawei'>Huawei</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'Realmi'} value='Realmi'></input>
                        <label className='categories-item__label' htmlFor='Realmi'>Realmi</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'Nokia'} value='Nokia'></input>
                        <label className='categories-item__label' htmlFor='Nokia'>Nokia</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'Vivo'} value='Vivo'></input>
                        <label className='categories-item__label' htmlFor='Vivo'>Vivo</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handleBrandchange} checked={productBrand === 'Oppo'} value='Oppo'></input>
                        <label className='categories-item__label' htmlFor='Oppo'>Oppo</label>
                    </li>
                </ul>
            </nav>



            {/* CATEGORIES GIÁ */}
            <nav className='categories'>
                <ul className='categories-list'>
                    <h3 className='categories__heading'>Mức giá</h3>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handlePriceChange} checked={priceRange === 'all'} value='all' />
                        <label className='categories-item__label' htmlFor='all'>Tất cả</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handlePriceChange} checked={priceRange === '0-2'} value='0-2' />
                        <label className='categories-item__label' htmlFor='0-2'>Dưới 2 triệu</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handlePriceChange} checked={priceRange === '2-4'} value='2-4' />
                        <label className='categories-item__label' htmlFor='2-4'>2 - 4 triệu</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handlePriceChange} checked={priceRange === '4-7'} value='4-7' />
                        <label className='categories-item__label' htmlFor='4-7'>4 - 7 triệu</label>
                    </li>
                    <li className='categories-item'  >
                        <input className='categories-item__input' type='checkbox' onChange={handlePriceChange} checked={priceRange === '7-13'} value='7-13' />
                        <label className='categories-item__label' htmlFor='7-13'>7 - 13 triệu</label>
                    </li>
                    <li className='categories-item' >
                        <input className='categories-item__input' type='checkbox' onChange={handlePriceChange} checked={priceRange === '13+'} value='13+' />
                        <label className='categories-item__label' htmlFor='13+'>Trên 13 triệu</label>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default CategoryOld;