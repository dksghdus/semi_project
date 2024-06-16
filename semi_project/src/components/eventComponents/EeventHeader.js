import axios from "axios";
import styles from '../../css/main_css/LoginMainPage.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch} from 'react-redux';
import {clearToken} from '../mainComponents/MemberSlice';
import { useSelector } from 'react-redux';

export default function Import() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [MyPage, setMyPage] = useState('');
  const navigate = useNavigate('');
  const dispatch = useDispatch('');
  const info = useSelector(state => state.member.value);


  //마이페이지 이모트 클릭시 마이페이지 오픈
  const MyPageClick = () => {
    setMyPage(!MyPage);
   };

   //로그인 정보에 대한것
   useEffect(() =>{
    //로그인을 하지 않은 상태에서 해당 화면으로 강제 이동할 시
    //로그인 정보가 없으면 login페이지로 이동됨
    if(info.token == null){
      alert('로그인 정보가 없습니다. 로그인 해주세요');
      navigate('/login');
      return;
    }
    //로그인 후 이름과 아이디를 호출하는 함수
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
      navigate("/login");
    }
  }
  fetchData();
  },[])
//로그아웃 버튼을 누르면 로그아웃이 되는 함수
  const logout = () => {
    dispatch(clearToken());
    alert('로그아웃 처리되었습니다.');
    navigate("/")
  }


  return(
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
      {/* 
        메뉴 바 (위치를 옮기고 싶을 시에는 css를 직접 조작하여 움직이면 된다.
        위로 올리고 싶으면 pImage_container를 맨 위로 올리고 css를 바꾸면 된다.
      )*/}
    <div className={styles.pImage_container}>
      <div className={styles.pTag_container}>
        <Link to='/eventinfo' className={styles.pTag1}>행사</Link>
        <Link to='/restaurants' className={styles.pTag2}>맛집</Link>
        <Link to='/' className={styles.pTag3}>숙박</Link>
        </div>
      </div>
      </div>
  )
};
