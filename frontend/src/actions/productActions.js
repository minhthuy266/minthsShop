import { axiosClient } from "../utils/axiosClient";
import * as types from "../constants/productConstants";
import { logout } from "./userActions";

export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.PRODUCT_LIST_REQUEST,
      });
      const { data } = await axiosClient.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: types.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: types.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const listProductsAdmin = () => async (dispatch) => {
//   try {
//     dispatch({type: types.PRODUCT_LIST_ADMIN_REQUEST})

//     const {data} = await axiosClientget('/api/products')

//     dispatch({
//       type: types.PRODUCT_LIST_ADMIN_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: types.PRODUCT_LIST_ADMIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PRODUCT_DETAIL_REQUEST,
    });
    const { data } = await axiosClient.get(`/api/products/${id}`);
    dispatch({
      type: types.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axiosClient.delete(`/api/products/${id}`, config);

    dispatch({
      type: types.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: types.PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosClient.post(`/api/products`, {}, config);

    dispatch({
      type: types.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: types.PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosClient.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: types.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: types.PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: types.PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: types.PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axiosClient.post(
        `/api/products/${productId}/reviews`,
        review,
        config
      );

      dispatch({
        type: types.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: types.PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_TOP_REQUEST });

    const { data } = await axiosClient.get(`/api/products/top`);

    dispatch({
      type: types.PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
