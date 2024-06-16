import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../css/restaurant_css/restaurantinfo.css';
import Import from '../headerComponents/Import';

const RestaurantInfo = () => {
  const { contentid } = useParams();
  const [restaurantData, setRestaurantData] = useState({
    title: '',
    tel: '',
    telname: '',
    homepage: '',
    addr1: '',
    zipcode: '',
    overview: '',
    firstimage: '',
    opentimefood: '',
    packing: '',
    firstmenu: ''
    // name:''
  });

  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&contentId=${contentid}&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&firstImageYN=Y&MobileOS=ETC&MobileApp=AppTest`);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const record = xmlDoc.querySelector('item');
        if (record) {
          const title = record.querySelector('title')?.textContent || 'N/A';
          const tel = record.querySelector('tel')?.textContent || 'No Data';
          const telname = record.querySelector('telname')?.textContent || 'No Data';
          const homepage = record.querySelector('homepage')?.textContent || 'No Data';
          const addr1 = record.querySelector('addr1')?.textContent || 'No Data';
          const zipcode = record.querySelector('zipcode')?.textContent || 'No Data';
          const overview = record.querySelector('overview')?.textContent || 'No Data';
          const firstimage = record.querySelector('firstimage')?.textContent || 'No Data';
          
          const formattedOverview = overview.replace(/\./g, '.\n');

          setRestaurantData(prevData =>({
            ...prevData,
            title,
            tel,
            telname,
            homepage,
            addr1,
            zipcode,
            overview: formattedOverview,
            firstimage
            // name
          }));
        }

        const detailResponse = await fetch(`http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentid}&contentTypeId=39`);
          const detailText = await detailResponse.text();
          const detailParser = new DOMParser();
          const detailXmlDoc = detailParser.parseFromString(detailText, 'text/xml');
          const opentimefood = detailXmlDoc.querySelector('opentimefood')?.textContent || 'No Data';
          const packing = detailXmlDoc.querySelector('packing')?.textContent || 'No Data';
          const firstmenu = detailXmlDoc.querySelector('firstmenu')?.textContent || 'No Data'

          setRestaurantData(prevData =>({
            ...prevData,
            opentimefood,
            packing,
            firstmenu
          }));

         /*  const areaResponse = await fetch('http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=인증키&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest');
          const areaData = await areaResponse.text();
          const areaParser = new DOMParser();
          const areaXmlDoc = areaParser.parseFromString(areaData, 'text/xml');

          const name = areaXmlDoc.querySelector('name')?.textContent || 'No Data'

          setRestaurantData(prevData =>({
            ...prevData,
            name
          }));
 */
          
          const imageResponse = await fetch(`http://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentid}&imageYN=Y&subImageYN=Y`);
          const imageData = await imageResponse.text();
          const imageParser = new DOMParser();
          const imageXmlDoc = imageParser.parseFromString(imageData, 'text/xml');

          const originimgurls = Array.from(imageXmlDoc.querySelectorAll('item'))
            .map(item => item.querySelector('originimgurl')?.textContent || '');

          setImages(originimgurls);
          if (originimgurls.length > 0) {
            setMainImage(originimgurls[0]);
          }
        
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contentid]);

  const handleImageClick = (originImageUrl) => {
    setMainImage(originImageUrl);
  };

  return (
    <div>
      {/* <Import /> */}
      <img src={mainImage} className="info_main_img" alt="메인 이미지" />
      <figure>
      {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`추가 이미지 ${index + 1}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
        </figure>
        <div className='restaurant_info'>
      <section className="info_title">
        <article className='restaurant_info_name'>
          <p>{restaurantData.title}</p>
        </article>
        
        <article className="info_title_details">
          <p>우편번호 : {restaurantData.zipcode}</p>
          <p>주소 : {restaurantData.addr1}</p>
          <p>전화명 : {restaurantData.telname}</p>
          <p>전화번호 : {restaurantData.tel}</p>
          </article>
          <article className="info_title_details">
          <p>오픈시간 : {restaurantData.opentimefood}</p>
          <p>포장 여부 : {restaurantData.packing}</p>
          <p>메인 메뉴 : {restaurantData.firstmenu}</p>
          <p>홈페이지 : <span dangerouslySetInnerHTML={{ __html: restaurantData.homepage }} /></p>
        </article>
      </section>
      <hr/>
      <p className="info_detail customOverview">
        <li>개요</li>
        <br />
        {restaurantData.name}
        <br />
        {restaurantData.overview.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      </div>
    </div>
  );
};

export default RestaurantInfo;
