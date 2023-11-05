import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import products from '../assets/data/products';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clock from '../components/UI/Clock';
import ProductList from '../components/UI/ProductsList'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    // Tìm sản phẩm theo id và cập nhật state
    const foundProduct = products.find(item => item.id === id);
    setProduct(foundProduct);

    //sự kiện trang sẽ cuộn đầu trang khi product thay đổi.
    window.scrollTo(0, 0);

   
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { imgUrl, productName, catrgory } = product;
  const relateProduct = products.filter((item)=> item.catrgory===catrgory);
  
  return (
    <Helmet title={productName}>
      <section>
        <Container className='px-10'>
          <Row className='pt-3 pb-3'>
            <Col lg="12">
              <h2 className='pt-3 pb-3 font-semibold'>{productName}</h2>
              <div>
                <Link to='/home'><span className='hover:text-[#b41712]'>trang chủ</span></Link> / <span className='text-[#b41712] cursor-pointer'>tài sản đấu giá</span>
              </div>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col lg="5">
              <img src={imgUrl} alt={productName} className='rounded-md' />
            </Col>
            <Col lg="7">
              <div className='p-2 '>
                <div className='p-4 shadow-lg rounded'>
                  <Clock productId={id} />
                </div>
              </div>

              <div class=" property-info bg-white   shadow-md  rounded mb-4 ">
    <h2 class="text-2xl font-bold mb-4">Thông tin tài sản</h2>
    <p><span class="label font-bold">Mã tài sản:</span> MTS-PLVPSQ</p>
    <p><span class="label font-bold">Thời gian mở đăng ký:</span> 06/10/2023 08:00:00</p>
    <p><span class="label font-bold">Thời gian kết thúc đăng ký:</span> 16/10/2023 17:00:00</p>
    <p><span class="label font-bold">Giá khởi điểm:</span> 991.800.000 VNĐ</p>
    <p><span class="label font-bold">Phí đăng ký tham gia đấu giá:</span> 500.000 VNĐ</p>
    <p><span class="label font-bold">Bước giá:</span> 5.000.000 VNĐ</p>
    <p><span class="label font-bold">Số bước giá tối đa/ lần trả:</span> Bước giá không giới hạn</p>
    <p><span class="label font-bold">Tiền đặt trước:</span> 198.000.000 VNĐ</p>
     <p><span class="label font-bold">Phương thức đấu giá:</span> Trả giá lên và liên tục</p>
     <p><span class="label font-bold">Thời gian bắt đầu trả giá:</span> 19/10/2023 09:00:00</p>
     <p><span class="label font-bold">Thời gian kết thúc trả giá:</span> 19/10/2023 10:00:00</p>
   </div>
            </Col>
            <h3 className='font-semibold p-3 text-[20px]'> Các Phiên đấu giá khác:</h3>
            <ProductList data={relateProduct}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;