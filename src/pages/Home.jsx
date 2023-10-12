import React,{useState,useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import '../Style/Home.css'
import banner from '../assets/images/banner.png'
import { Container, Row, Col, Button } from 'reactstrap';
import ellipse from '../assets/images/ellipse.png'


 
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products'

const Home = () => {

const [data,setData] =useState(products)

useEffect(() =>{
  const filteredProduct = products.filter(item=>item.category ==="car");
  setData(filteredProduct)

},[]);





  return (<Helmet title={'home'}>
<section className="bg-[url('/src/assets/images/ss1-bannerbg.png')] relative z-10	 ">

      <Container className="  p-5">
           <Row className='s1 mt-4'>
            <Col md={5}>
              <img src={ellipse} alt='img' className='s2 img-fluid'/>
            <h1 className="text-[#b41712] font-[600] text-[20px]">
              Chào mừng bạn đến với Lạc Việt Auction
            </h1>
            <h2 className="text-black font-[600] mt-4 mb-5 text-[36px]	">
              Nền tảng đấu giá trực tuyến hàng đầu Việt Nam
            </h2>
            <p className="text-dark">
              Tự hào là một trong những nhà đấu giá lớn nhất tại Việt Nam, Lạc Việt luôn là đơn vị tiên phong ứng dụng công nghệ thông tin vào hoạt động đấu giá. Ngày 17/07/2020, Lạc Việt vinh dự tổ chức thành công cuộc đấu giá trực tuyến chính thống đầu tiên tại Việt Nam, mở ra 1 chương mới cho hoạt động đấu giá nước nhà.
            </p>
            <Button  className="mr-3 w-[150px] bg-[#b41712] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#b41712] before:to-[#ff9264] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff] ">
              Khám phá
            </Button>
          </Col>
          <Col md={7}>
            <img src={banner} className="w-100" alt="banner" />
          </Col>
        </Row>
      </Container>
    </section>




    <section className="Trending__product mt-2 bg-[#f9fafa] mb-5">
        <Container c>
            <Row>
                <Col lg="12 mt-5 mb-4 ml-[37px] flex justify-center">
               <span className='text-[#b41712] text-[30px]'>
                 <i class="ri-pulse-line"></i></span> 
                <h2 className='font-[600]	'>Phiên đấu giá đáng chú ý</h2>
                <span className='text-[#b41712] text-[30px]'>
                  <i class="ri-pulse-line"></i></span>
                </Col>
                <ProductsList data={data}/>
            </Row> 
        </Container>
        

    </section>

   
    </Helmet>
    
  )
}

export default Home



