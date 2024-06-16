import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import KakaoMap from './KakaoMap';
import '../../css/restaurant_css/restaurant.css';
import Import from '../headerComponents/Import';

const RestaurantMain = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 10]);
  const restaurantsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      let allRestaurants = [];
      let pageNo = 1;

      try {
        
          console.log("init");
          const response = await fetch(`http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&pageNo=3&numOfRows=150&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=39`);
          const text = await response.text();
          const parser = new DOMParser();
          
          const xmlDoc = parser.parseFromString(text, 'text/xml');
          const items = Array.from(xmlDoc.querySelectorAll('item'));
          const restaurantsData = await Promise.all(items.map(async (item) => {
              const contentid = item.querySelector('contentid')?.textContent || null;
              const firstimage = item.querySelector('firstimage')?.textContent || './img/xbox.png';
              
              const restaurantInfo = {
                title: item.querySelector('title')?.textContent || 'No Data',
                addr1: item.querySelector('addr1')?.textContent || 'No Data',
                tel: item.querySelector('tel')?.textContent || 'No Data',
                firstimage: firstimage,
                contentid: contentid,
                viewCount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
                starCount: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
               
              };
              
              return restaurantInfo;
            
          }));

          allRestaurants = [...allRestaurants, ...restaurantsData.filter(restaurant => restaurant !== null)];
          pageNo += 1;
        

        setRestaurants(allRestaurants);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  

  const handleNextPageRange = () => {
    setPageRange([pageRange[0] + 10, pageRange[1] + 10]);
  };

  const handlePreviousPageRange = () => {
    if (pageRange[0] > 1) {
      setPageRange([pageRange[0] - 10, pageRange[1] - 10]);
    }
  };

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  return (
    <div>
      <Import/>
      <KakaoMap />
      <section className='restaurant_section'>
        <article className='restaurant_article'>
          {currentRestaurants.map((restaurant, index) => (
            <Link to={`/restaurantinfo/${restaurant.contentid}`} className="restaurant_product" key={index}>
              <img src={restaurant.firstimage} alt="이미지" className="restaurant_store" />
              <div className="restaurant_product_info">
                <span>{restaurant.title}</span>
                <p><img src="/img/eye.png" className="restaurant_icon" alt="조회수 아이콘" />{restaurant.viewCount}<img src="/img/star.png" className="restaurant_icon" alt="별점 아이콘" /> {restaurant.starCount}</p>
                <br />
                <p className="restaurant_product_info_sub">
                  주소 : {restaurant.addr1}
                  <br />
                  Tell : {restaurant.tel}
                  <br />
                  
                  <br />
                  {/* <span className='restaurant_contentid'>{restaurant.contentid}</span> */}
                  <br />
                  <br />
                  
                </p>
              </div>
            </Link>
          ))}
        </article>

        <p className="restaurant_page_bar">
          {pageRange[0] > 1 && (
            <Link onClick={handlePreviousPageRange} to="#">
              {'<'}
            </Link>
          )}
          {Array.from({ length: Math.min(10, totalPages - pageRange[0] + 1) }, (_, i) => (
            <Link key={pageRange[0] + i} onClick={() => paginate(pageRange[0] + i)} to="#">
              {pageRange[0] + i}
            </Link>
          ))}
          {pageRange[1] < totalPages && (
            <Link onClick={handleNextPageRange} to="#">
              {'>'}
            </Link>
          )}
        </p>
      </section>
    </div>
  );
};

export default RestaurantMain;
