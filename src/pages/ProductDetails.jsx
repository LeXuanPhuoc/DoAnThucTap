import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import products from '../assets/data/products';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clock from '../components/UI/Clock';


const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(item => item.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { imgUrl, productName } = product;

  return (
    <Helmet title={productName}>
      

      <section>
        <Container className='px-10'>
          <Row className='pt-3 pb-3'>
            <Col lg="12">
              <h2 className='pt-3 pb-3 font-semibold		'>{productName}</h2>
              <div>
               <Link to='/home'> <span className='hover:text-[#b41712]'>trang chủ</span></Link> / <span className='text-[#b41712] cursor-pointer	'>tài sản đấu giá</span>
              </div>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col lg="5">
              <img src={imgUrl} alt={productName}
              className='rounded-md' />
            </Col>
            <Col lg="7">
              <div className='p-2 '>
              <span>thời gian đếm ngược bắt đầu trả giá:</span>
              <div className='p-4 shadow-lg rounded'><Clock/></div>
              
              </div>
              
              <div class=" property-info bg-white   shadow-md  rounded ">
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
    <p><span class="label font-bold">Tên chủ tài sản:</span> Cục Hành chính – Quản trị II, Văn phòng Chính phủ</p>
    <p><span class="label font-bold">Nơi xem tài sản:</span> Cục Hành chính – Quản trị II, Văn phòng Chính phủ, Địa chỉ: Số 7 Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
    <p><span class="label font-bold">Thời gian xem tài sản:</span> ngày 12/10/2023 và ngày 13/10/2023 (trong giờ hành chính)</p>
    <p><span class="label font-bold">Thời gian bắt đầu trả giá:</span> 19/10/2023 09:00:00</p>
    <p><span class="label font-bold">Thời gian kết thúc trả giá:</span> 19/10/2023 10:00:00</p>
  </div>
             
            </Col>
            <Col lg="5">
           
            </Col>
          </Row>
         
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;