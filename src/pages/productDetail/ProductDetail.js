import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import dummyImg from "../../assets/naruto.jpeg";
import { axiosClient } from "../../utils/axiosClient";
import "./ProductDetail.scss";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);
  const quantity =
    cart.find((item) => item.key === params.productId)?.quantity || 0;

  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productId}&populate=*`
    );
    if (productResponse.data.data.length > 0) {
      //it returns array
      setProduct(productResponse.data.data[0]);
    }
  }

  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  if (!product) {
    return <Loader />;
  }

  console.log(product);

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img">
            <img
              src={product?.attributes.image.data.attributes.url}
              alt="product img"
            />
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.attributes.title}</h1>
            <h3 className="price">₹ {product?.attributes.price}</h3>
            <p className="description">{product?.attributes.desc}</p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span
                  className="btn decrement"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  -
                </span>
                <span className="quantity">{quantity}</span>
                <span
                  className="btn increment"
                  onClick={() => dispatch(addToCart(product))}
                >
                  +
                </span>
              </div>
              <button
                className="btn-primary add-to-cart"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>

            <div className="return-policy">
              <ul>
                <li>
                  Customers can return any book within 14 days of purchase, as
                  long as the book is in its original condition.
                </li>
                <li>
                  To be eligible for a return, the book must be in its original
                  condition, with no markings or damages to the cover, pages, or
                  spine.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
