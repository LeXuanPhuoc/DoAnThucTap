
import React,{useState,useEffect} from 'react'

const Clock = () => {


    const[days, setDays]=useState()
    const[hours, setHours]=useState()
    const[minutes, setMinutes]=useState()
    const[seconds, setSeconds]=useState()

    let interval;

    


    const countDown = () => {
        const destination = new Date('Oct 20, 2023').getTime();
        interval = setInterval(() => {
          const now = new Date().getTime();
          const difference = destination - now;
      
          if (difference <= 0) {
            clearInterval(interval);
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
          } else {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
          }
        }, 1000);
      };

    useEffect(() =>{
        countDown()
    })

  return <div className='clock__wrapper d-flex align-items-center gap-5'>
    <div className='clock__data         d-flex align-items-center gap-3'>
        <div className='text-center'>
            <h1 className='text-black fs-5 mb-2'>{days}</h1>
            <h5 className='text-black fs-5'>Ngày</h5>

        </div>
        <span className='text-black fs-5 '>:</span>
    </div>


    <div className='clock__data         d-flex align-items-center gap-3'>
        <div className='text-center'>
            <h1 className='text-black fs-5 mb-2'>{hours}</h1>
            <h5 className='text-black fs-5'>Giờ</h5>

        </div>
        <span className='text-black fs-5'>:</span>
    </div>


    <div className='clock__data         d-flex align-items-center gap-3'>
        <div className='text-center'>
            <h1 className='text-black fs-5 mb-2'>{minutes}</h1>
            <h5 className='text-black fs-5'>phút</h5>

        </div>
        <span className='text-black fs-5'>:</span>
    </div>


    <div className='clock__data         d-flex align-items-center gap-3'>
        <div className='text-center'>
            <h1 className='text-black fs-5 mb-2'>{seconds}</h1>
            <h5 className='text-black fs-5'>Giây</h5>

        </div>
       
    </div>





  </div>
    

}

export default Clock;