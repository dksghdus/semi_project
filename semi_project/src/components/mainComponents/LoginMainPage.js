import { Link,useNavigate } from 'react-router-dom';
import styles from '../../css/main_css/LoginMainPage.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearToken } from "../../store/MemberSlice";
import axios from 'axios';

function MainPage() { 
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [MyPage, setMyPage] = useState(false);
  const info = useSelector(state => state.member.value);
  const dispatch = useDispatch();

  // 마이페이지 이모트 클릭시 마이페이지 나옴
  const MyPageClick = () => {
    setMyPage(!MyPage);
    };

  // 메인 이미지 클릭시 이동되는 함수
  const mainClick = () => {
    window.location.href='http://www.xn--vk1b9fv8tlkdzuqf4h.com/';
  };
  const sub1Click = () => {
    window.location.href='https://cruisestory.co.kr/';
  }
  const sub2Click = () => {
    window.location.href='https://dgdr.kr/';
  };
  const sub3Click = () => {
    window.location.href='https://cruisestory.co.kr/';
  } 


  useEffect(() =>{
    if(info.token == null){
      alert('로그인 정보가 없습니다. 로그인 해주세요');
      navigate('/login');
      return;
    }
    const fetchData = async () => {
    try {
        const response = await axios.get('http://nam3324.synology.me:32845/member/info', {               
        params :{ token : info.token}
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        const token = {
          token : response.data.token,
          user : response.data.user
        };
        if(response.data.flag){
          setName(response.data.name);
          setId(response.data.id);
        }
      }
    } catch (error) {
      alert('로그인 후 이용해주세요.');
      console.error(error);
      // navigate("/login");
    }
  }
  fetchData();
  },[])
  const logout = () => {
    dispatch(clearToken());
    alert('로그아웃 처리되었습니다.');
    navigate("/")
  }




  return (
    <div className={styles.home}>
      <div className={styles.home_first_container}>
      <Link to='/main' className={styles.loginHome}></Link>
      <button type='button' className={styles.myPage_btn} onClick={MyPageClick}></button> 
      {/* 마이페이지 부분 */}
      {MyPage && (
        <div className={styles.myPage}>
          <div className={styles.myPage2}>
          <h2 className={styles.myPageName}>이름 : {name}</h2>
          <h2 className={styles.myPageId}>아이디 : {id}</h2>
          </div>
          <div className={styles.myPage3}>
          <button type='button' className={styles.myPageLogout} onClick={logout}>로그아웃</button>
          </div>
        </div>
      )}
      </div>
    <div className={styles.pImage_container}>
      <div className={styles.pTag_container}>
        <Link to='/eventinfo' className={styles.pTag1}>행사</Link>
        <Link to='/restaurant' className={styles.pTag2}>맛집</Link>
        <Link to='/accommodation' className={styles.pTag3}>숙박</Link>
        </div>
      {/* 메인 이미지 부분 */}
        <div className={styles.main_image}>
          <image className={styles.mainImage} onClick={mainClick}></image>
      </div>
    </div>
      {/* 서브 이미지 부분 */}
      <div className={styles.home_secound_container}>
      <table>
          <tr>
            <div className={styles.sub1_container}>
            <td><image className={styles.subImage1} onClick={sub1Click}/></td>
            <div className={styles.sub1}>
            <td className={styles.subName}><a href='/'></a>릴랙스위크</td>
            <td className={styles.subExplanation}><a href='/'>몸과 마음이 지친 현대인에게 건강한 
            '나다움'을 제안해온 마음챙김 및 힐링 전문 대규모 축제다. 
            </a></td>
            </div>
            </div>
          </tr>
          <tr>
          <div className={styles.sub2_container}>
          <div className={styles.sub2}>
            <td className={styles.subName}><a href='/'>대전 동구동락 축제
            </a></td>
            <td className={styles.subExplanation}><a href='/'>교통의 중심인 대전역 뒷편 동광장 및 대동천 일원에서
             즐기는 문화관광축제이다. 세계의 음식과 야간경관거리, 공연 및 경연 프로그램, 
             체험프로그램 등을 즐길 수 있다.</a></td>
            </div>
            <td><image className={styles.subImage2} onClick={sub2Click}/></td>
            </div>
          </tr>
          <tr>
          <div className={styles.sub3_container}>
            <td><image className={styles.subImage3} onClick={sub3Click}/></td>
            <div className={styles.sub3}>
            <td className={styles.subName}><a href='/'>김포 불꽃크루즈
            </a></td>
            <td className={styles.subExplanation}><a href='/'>크루즈 위에서 즐기는 가장 가까운 불꽃축제!
              국내 최대규모의 선상불꽃축제로 매주 토요일 저녁 아라김포여객터미널에서 출항한다.
              </a></td>
            </div>
            </div>
          </tr>
        </table>
      </div>
      {/* 날씨, 위로 올라가기 버튼 부분 */}
      <footer>
        <a href='/' className={styles.weather}></a>
        <button type='submit' className={styles.up} onClick={() => 
          window.scrollTo({top : 0, behavior:'instant'})}>up</button>
      </footer>
      <div className={styles.info_container}>
          <p className={styles.info1}></p>
          <p className={styles.info2}></p>
          <p className={styles.info3}>문의 전화번호 : 000-0000-0000</p>
      </div>
    </div>
  );
}

export default MainPage;