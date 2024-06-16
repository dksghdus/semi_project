import React, { useState, useEffect } from 'react';
import Area from './Area';
import { Link } from 'react-router-dom';
import ImageList from './ImageList';
import EventHeader from './EeventHeader';

export default function EventInfo() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [images, setImages] = useState([]);
  const [areaCode, setAreaCode] = useState('areaCode=1');
  const [subAreaCode, setSubAreaCode] = useState('sigunguCode=1');
  const [showArea2, setShowArea2] = useState(true);
  const [showArea3, setShowArea3] = useState(true);

  const onEvent = () => {
    const url = `http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        const areas1 = result.response.body.items.item;
        setData1(areas1);
        if (areas1 && areas1.length > 0) {
          handleClick(areas1[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleClick = (item) => {
    setAreaCode(`areaCode=${item.code}`);
    setShowArea2(true);
    setShowArea3(false);
  };

  const handleClick2 = (item) => {
    setSubAreaCode(`sigunguCode=${item.code}`);
    setShowArea3(true);
  };

  useEffect(() => {
    const fetchData2 = async () => {
      const url = `http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&${areaCode}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        const areas2 = result.response.body.items.item;
        setData2(areas2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (areaCode) {
      fetchData2();
    }
  }, [areaCode]);

  useEffect(() => {
    const fetchData3 = async () => {
      const url = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&${areaCode}&${subAreaCode}&arrange=A&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=15&_type=json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        const images = result.response.body.items.item;
        console.log(images);
        setImages(images);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (showArea3) {
      fetchData3();
    }
  }, [areaCode, subAreaCode, showArea3]);

  useEffect(() => {
    onEvent();
  }, []);

  const handleImageClick = (contentId) => {
    sessionStorage.setItem('images', JSON.stringify([contentId]));
  };

  return (
    <div>
      <EventHeader/>
      <div>
        <Area data={data1} onClick={handleClick} show={true} />
        <Area data={data2} onClick={handleClick2} show={showArea2} />
      </div>

      <Link to="/event">
        <ImageList images={images} onImageClick={handleImageClick} />
      </Link>
    </div>
  );
}