// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Carousel, Image } from 'antd'
// import { Loader } from '../../components/UI Handler/Loader/Loader'
// import { Message } from '../../components/UI Handler/Message/Message'
// import { listTopProducts } from '../../actions/productActions'
// import { useDispatch, useSelector } from 'react-redux'

// const ProductCarousel = () => {
//   const dispatch = useDispatch()

//   const productTopRated = useSelector((state) => state.productTopRated)
//   const { loading, error, products } = productTopRated

//   useEffect(() => {
//     dispatch(listTopProducts())
//   }, [dispatch])

//   const contentStyle = {
//     height: '400px',
//     color: '#fff',
//     lineHeight: '160px',
//     textAlign: 'center',
//     background: '#364d79',
//   }

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type='error' description={error} />
//       ) : (
//         <Carousel autoplay>
//           {products.map((product) => (
//             <div key={product._id}>
//               <Link to={`/product/${product._id}`}>
//                 <h3 style={contentStyle}>
//                   <Image src={product.image} alt={product.name} width={400} />
//                 </h3>
//               </Link>
//             </div>
//           ))}
//         </Carousel>
//       )}
//     </>
//   )
// }

// export default ProductCarousel

import React, {useEffect} from 'react'
import {Carousel, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {listTopProducts} from '../../actions/productActions'
import {Loader} from '../../components/UI Handler/Loader/Loader'
import {Message} from '../../components/UI Handler/Message/Message'
import './ProductCarousel.css'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const {loading, error, products} = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type='error' description={error} />
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h3>
                {product.name} (${product.price})
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
