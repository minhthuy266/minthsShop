// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { Loader } from '../../components/UI Handler/Loader/Loader'
// import { Message } from '../../components/UI Handler/Message/Message'
// import { register } from '../../actions/userActions'
// import FormContainer from '../../components/FormContainer/FormContainer'
// import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
// import {
//   listProducts,
//   deleteProduct,
//   createProduct,
// } from '../../actions/productActions'
// import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

// const ProductListPage = ({ history, match }) => {
//   const dispatch = useDispatch()

//   const productList = useSelector((state) => state.productList)
//   const { loading, error, products } = productList

//   const productDelete = useSelector((state) => state.productDelete)
//   const {
//     loading: loadingDelete,
//     error: errorDelete,
//     success: successDelete,
//   } = productDelete

//   const productCreate = useSelector((state) => state.productCreate)
//   const {
//     loading: loadingCreate,
//     error: errorCreate,
//     success: successCreate,
//     product: createdProduct,
//   } = productCreate

//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin

//   useEffect(() => {
//     dispatch({ type: PRODUCT_CREATE_RESET })

//     if (!userInfo.isAdmin) {
//       history.push('/login')
//     }

//     if (successCreate) {
//       history.push(`/admin/product/${createProduct._id}/edit`)
//     } else {
//       dispatch(listProducts())
//     }
//   }, [
//     dispatch,
//     history,
//     userInfo,
//     successDelete,
//     successCreate,
//     createdProduct,
//   ])

//   const deleteHandler = (id) => {
//     if (window.confirm('Are you sure?')) {
//       dispatch(deleteProduct(id))
//     }
//   }

//   const createProductHandler = () => {
//     dispatch(createProduct())
//   }

//   return (
//     <>
//       <Row>
//         <Col>
//           <h1>Products</h1>
//         </Col>

//         <Col>
//           <Button onClick={createProductHandler}>Create Product</Button>
//         </Col>
//       </Row>

//       {loadingDelete && <Loader />}
//       {errorDelete && <Message type='error' description={errorDelete} />}

//       {loadingCreate && <Loader />}
//       {errorCreate && <Message type='error' description={errorCreate} />}

//       {loading ? (
//         <Loader type='error' description={error} />
//       ) : (
//         <>
//           <Row>
//             <Col>ID</Col>
//             <Col>NAME</Col>
//             <Col>PRICE</Col>
//             <Col>CATEGORY</Col>
//             <Col>BRAND</Col>
//             <Col></Col>
//           </Row>

//           {products.map((product) => (
//             <Row key={product._id}>
//               <Col>{product._id}</Col>
//               <Col>{product.name}</Col>
//               <Col>${product.price}</Col>
//               <Col>{product.category}</Col>
//               <Col>{product.brand}</Col>
//               <Col>
//                 <Link to={`/admin/product/${product._id}/edit`}>
//                   <Button>
//                     {' '}
//                     <i className='fas fa-edit'></i>{' '}
//                   </Button>
//                 </Link>

//                 <Button onClick={() => deleteHandler(product._id)}>
//                   {' '}
//                   <i className='fas fa-trash'></i>
//                 </Button>
//               </Col>
//             </Row>
//           ))}
//         </>
//       )}
//     </>
//   )
// }

// export default ProductListPage

// import {Button, Col, Divider, Row} from 'antd'
// import React, {useEffect} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {listProductsAdmin} from '../../actions/productActions'
// import {Loader} from '../../components/UI Handler/Loader/Loader'
// import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'
// import Rating from '../../components/Rating/Rating'

// const ProductListPage = ({history, match}) => {
//   const dispatch = useDispatch()

//   const productListAdmin = useSelector((state) => state.productListAdmin)
//   const {loading, error, productsAdmin} = productListAdmin

//   const userLogin = useSelector((state) => state.userLogin)
//   const {userInfo} = userLogin

//   useEffect(() => {
//     if (userInfo && userInfo.isAdmin) {
//       dispatch(listProductsAdmin())
//     } else {
//       history.push('/login')
//     }
//   }, [dispatch, history, userInfo])

//   const deleteHandler = (id) => {
//     if (window.confirm('Are you sure?')) {
//       // DELETE PRODUCTS
//     }
//   }

//   const createProductHandler = (product) => {
//     // CREATE PRODUCT
//   }

//   return (
//     <>
//       <Row>
//         <Col>
//           <h1>Products</h1>
//         </Col>

//         <Col>
//           <Button onClick={createProductHandler}>Create Product</Button>
//         </Col>
//       </Row>

//       {loading ? (
//         <Loader type='error' description={error} />
//       ) : (
//         <>
//           <Row>
//             <Col lg={{span: 6}} md={{span: 7}} xs={{span: 0}}>
//               ID
//             </Col>
//             <Col lg={{span: 4}} md={{span: 3}} xs={{span: 0}}>
//               NAME
//             </Col>
//             <Col lg={{span: 4}} md={{span: 5}} xs={{span: 0}}>
//               PRICE
//             </Col>
//             <Col lg={{span: 4}} md={{span: 4}} xs={{span: 0}}>
//               CATEORY
//             </Col>

//             <Col lg={{span: 4}} md={{span: 4}} xs={{span: 0}}>
//               BRAND
//             </Col>
//             <Col lg={{span: 6}} xs={{span: 0}}></Col>
//           </Row>

//           <Divider />

//           {productsAdmin.map((product) => (
//             <>
//               <Row key={product._id}>
//                 <Col lg={{span: 6}} md={{span: 7}} xs={{span: 24}}>
//                   <span className='hide-on-desktop-tablet'>ID: </span>
//                   {product._id}
//                 </Col>
//                 <Col lg={{span: 4}} md={{span: 3}} xs={{span: 24}}>
//                   <span className='hide-on-desktop-tablet'>NAME: </span>
//                   {product.name}
//                 </Col>
//                 <Col lg={{span: 4}} md={{span: 5}} xs={{span: 24}}>
//                   <span className='hide-on-desktop-tablet'>PRICE: </span>$
//                   {product.price}
//                 </Col>
//                 <Col
//                   lg={{span: 4, offset: 0}}
//                   md={{span: 3, offset: 1}}
//                   xs={{span: 24}}>
//                   <span className='hide-on-desktop-tablet'>CATEGORY: </span>
//                   {product.category}
//                 </Col>

//                 <Col
//                   lg={{span: 4, offset: 0}}
//                   md={{span: 3, offset: 1}}
//                   xs={{span: 24}}>
//                   <span className='hide-on-desktop-tablet'>BRAND: </span>
//                   {product.brand}
//                 </Col>

//                 <Col
//                   lg={{span: 6, offset: 0}}
//                   md={{span: 4, offset: 0}}
//                   xs={{span: 12, offset: 12}}>
//                   <Link to={`/admin/product/${product._id}/edit`}>
//                     <Button>
//                       {' '}
//                       <i className='fas fa-edit'></i>{' '}
//                     </Button>
//                   </Link>

//                   <Button onClick={() => deleteHandler(product._id)}>
//                     {' '}
//                     <i className='fas fa-trash'></i>
//                   </Button>
//                 </Col>
//               </Row>

//               <Divider />
//             </>
//           ))}
//         </>
//       )}

//       {/* <PaginationComponent pages={pages} page={page} /> */}
//     </>
//   )
// }

// export default ProductListPage

import React from 'react'

const ProductListScreen = () => {
  return (
    <div>
      <h1>THIS IS PRODUCT LIST SCREEN/ADMIN</h1>
    </div>
  )
}

export default ProductListScreen
