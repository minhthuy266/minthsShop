import * as types from '../constants/productConstants'

export const productListReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case types.PRODUCT_LIST_REQUEST:
      return {loading: true, products: []}
    case types.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case types.PRODUCT_LIST_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = {product: {reviews: []}},
  action
) => {
  switch (action.type) {
    case types.PRODUCT_DETAIL_REQUEST:
      return {...state, loading: true}
    case types.PRODUCT_DETAIL_SUCCESS:
      return {...state, loading: false, product: action.payload}
    case types.PRODUCT_DETAIL_FAIL:
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PRODUCT_DELETE_REQUEST:
      return {loading: true}
    case types.PRODUCT_DELETE_SUCCESS:
      return {loading: false, success: true}
    case types.PRODUCT_DELETE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PRODUCT_CREATE_REQUEST:
      return {loading: true}
    case types.PRODUCT_CREATE_SUCCESS:
      return {loading: false, success: true, product: action.payload}
    case types.PRODUCT_CREATE_FAIL:
      return {loading: false, error: action.payload}
    case types.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case types.PRODUCT_UPDATE_REQUEST:
      return {loading: true}
    case types.PRODUCT_UPDATE_SUCCESS:
      return {loading: false, success: true, product: action.payload}
    case types.PRODUCT_UPDATE_FAIL:
      return {loading: false, error: action.payload}
    case types.PRODUCT_UPDATE_RESET:
      return {product: {}}
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PRODUCT_CREATE_REVIEW_REQUEST:
      return {loading: true}
    case types.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {loading: false, success: true}
    case types.PRODUCT_CREATE_REVIEW_FAIL:
      return {loading: false, error: action.payload}
    case types.PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopRatedReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case types.PRODUCT_TOP_REQUEST:
      return {loading: true, products: []}
    case types.PRODUCT_TOP_SUCCESS:
      return {loading: false, products: action.payload}
    case types.PRODUCT_TOP_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

// export const productListAdminReducer = (
//   state = {productsAdmin: []},
//   action
// ) => {
//   switch (action.type) {
//     case types.PRODUCT_LIST_ADMIN_REQUEST:
//       return {loading: true, products: []}
//     case types.PRODUCT_LIST_ADMIN_SUCCESS:
//       return {
//         loading: false,
//         productsAdmin: action.payload.products,
//       }
//     case types.PRODUCT_LIST_ADMIN_FAIL:
//       return {loading: false, error: action.payload}
//     default:
//       return state
//   }
// }
