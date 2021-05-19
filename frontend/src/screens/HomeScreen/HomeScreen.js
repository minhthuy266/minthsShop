import {Row, Space} from 'antd'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../../actions/productActions'
import ContactOption from '../../components/Contact Option/ContactOption'
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel'
import ProductList from '../../components/ProductList/ProductList'
import StoryCard from '../../components/StoryCard/StoryCard'
import {Loader} from '../../components/UI Handler/Loader/Loader'
import {Message} from '../../components/UI Handler/Message/Message'
import './HomeScreen.css'

const HomeScreen = ({match}) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const {loading, error, products, page, pages} = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      {!keyword && <StoryCard />}

      {!keyword && <ProductCarousel />}

      {!keyword && <ContactOption />}

      <h1 className='section-title'>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='error' message='Error' description={error} />
      ) : (
        <Space size='large'>
          <Row gutter={[40, 40]} justify='center'>
            {products.map((product) => (
              <ProductList product={product} key={product._id} />
            ))}
          </Row>
        </Space>
      )}
      <br />
      <br />
      <Row justify='center' className='pagination-component'>
        <PaginationComponent
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
        />
      </Row>
    </>
  )
}

export default HomeScreen
