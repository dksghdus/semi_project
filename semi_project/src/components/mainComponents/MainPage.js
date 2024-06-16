import { Link,useNavigate } from 'react-router-dom';
import styles from '../../css/main_css/MainPage.module.css';
import { useCallback, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

function MainPage() {
  const navigate = useNavigate();

  const SignInClick = () => {
    window.location.href = '/login';
  }

  const mainClick = () => {
    window.location.href='https://maebongretro.com';
  }  

  const menuClick = () => {
    alert('로그인 후 이용해주세요.');
    navigate('/');
  }
  return (
    <div className={styles.home}>
      <div className={styles.home_first_container}>
      <Link to='/' className={styles.logoutHome}></Link>
      <button type='button' className={styles.SignIn_btn} onClick={SignInClick}>로그인</button> 
      </div>
    <div className={styles.main_container}>
      <div className={styles.menu_container} onClick={menuClick}>
        <Link to='/eventinfo' className={styles.pTag1}>행사</Link>
        <Link to='/restaurant' className={styles.pTag2}>맛집</Link>
        <Link to='/accommodation' className={styles.pTag3}>숙박</Link>
        </div>
        <div className={styles.main_image}>
          <image className={styles.mainImage} onClick={mainClick}></image>
      </div>
    </div>
      <div className={styles.home_secound_container}>
        <table>
          <tr>
            <div className={styles.sub1_container}>
            <td><a href='/'><image className={styles.subImage1}/></a></td>
            <div className={styles.sub1}>
            <td className={styles.subName}><a href='/'>릴랙스위크</a></td>
            <td className={styles.subExplanation}><a href='/'>몸과 마음이 지친 현대인에게 건강한 
            '나다움'을 제안해온 마음챙김 및 힐링 전문 대규모 축제다. </a></td>
            </div>
            </div>
          </tr>
          <tr>
          <div className={styles.sub2_container}>
          <div className={styles.sub2}>
            <td className={styles.subName}><a href='/'>대전 동구동락 축제
            </a></td>
            <td className={styles.subExplanation}><a href='/'>교통의 중심인 대전역 뒷편 동광장 
            및 대동천 일원에서 즐기는 문화관광축제이다. 세계의 음식과 야간경관거리,
             공연 및 경연 프로그램, 체험프로그램 등을 즐길 수 있다.</a></td>
            </div>
            <td><a href='/'><image className={styles.subImage2}/></a></td>
            </div>
          </tr>
          <tr>
          <div className={styles.sub3_container}>
            <td><a href='/'><image className={styles.subImage3}/></a></td>
            <div className={styles.sub3}>
            <td className={styles.subName}><a href='/'>김포 불꽃크루즈</a></td>
            <td className={styles.subExplanation}><a href='/'>크루즈 위에서 즐기는 가장 가까운 불꽃축제!
            국내 최대규모의 선상불꽃축제로 매주 토요일 저녁 아라김포여객터미널에서 출항한다.</a></td>
            </div>
            </div>
          </tr>
        </table>
      </div>
      <footer>
        <Link to='/weather' className={styles.weather}></Link>
        <button type='button' className={styles.up} onClick={() => 
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