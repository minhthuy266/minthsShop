import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import FormContainer from "../../components/FormContainer/FormContainer";
import { Loader } from "../../components/UI Handler/Loader/Loader";
import { Message } from "../../components/UI Handler/Message/Message";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import { axiosClient } from "../../utils/axiosClient";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axiosClient.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist">
        <Button>Go Back</Button>
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message type="error" description={errorUpdate} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error" description={error} />
        ) : (
          <>
            <Form>
              <Form.Item label="Name" name="name" initialValue={product.name}>
                <Input
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                initialValue={product.price}
              >
                <Input
                  placeholder="Enter price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Brand"
                name="brand"
                initialValue={product.brand}
              >
                <Input
                  placeholder="Enter brand"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Count In Stock"
                name="countInStock"
                initialValue={product.countInStock}
              >
                <Input
                  placeholder="Enter countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                initialValue={product.category}
              >
                <Input
                  placeholder="Enter category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                initialValue={product.description}
              >
                <Input
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
            </Form>

            <Button type="primary" htmlType="submit" onClick={submitHandler}>
              Update
            </Button>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
