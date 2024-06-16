import styles from '../../css/main_css/LoginPage.module.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {saveToken} from '../../store/MemberSlice';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/login', {
        id : id, pwd : passwd });
        if (response.status === 200){
          if(response.data.flag){
            const token = {
              token : response.data.token,
              user : response.data.user
            };
            dispatch(saveToken(response.data));
            alert('로그인 성공');
            navigate('/main');
          }else
          alert('로그인 실패');
        console.log(response.data);
        }
      }catch (error) {
        alert('오류');
        console.log(error.response.data);
      }
    };

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
                <Link to="/"><div className={styles.header}/></Link>
            <div className={styles.formGroup}>
                <input 
                className={styles.input} 
                type="text" 
                id='id' 
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디" />
            </div>
            <div className={styles.formGroup}>
                <input 
                className={styles.input} 
                type="password" 
                id='passwd'
                onChange={(e) => setPasswd(e.target.value)}
                placeholder="비밀번호" />
            </div>
            <button type='submit' className={styles.button}>로그인</button>
            <div className={styles.footerLinks}>
                <Link to="/register">회원가입</Link>
            </div>
        </form>
      </div>
    );
}

export default LoginPage;