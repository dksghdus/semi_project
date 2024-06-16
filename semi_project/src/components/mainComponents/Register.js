import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/main_css/SignupPage.module.css';
import axios from 'axios';
function Register() {
  const [id,setId] = useState('');
  const [name,setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nick,setNick] = useState('');
  const [passwd,setPasswd] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [Rpasswd, setRpasswd] = useState('');
  const [msg, setMsg] = useState('');
  const [Rmsg, setRmsg] = useState('');
  const [button, setButton] = useState(false);
  const navigate = useNavigate();

  const registerSubmit = async (event) => {
    event.preventDefault();
    if(passwd !== Rpasswd){
      setRmsg('비밀번호가 일치하지 않습니다.');
      return;
    }
    try{
      const response = await axios.post('http://nam3324.synology.me:32845/member/register', {
        userID:id,
        userName: name,
        userPassword: passwd,
        userEmail:email,
        userPhone: phone,
        userNickName: nick,
        userGender: gender
      });
      alert('회원가입 성공');
      navigate('/login');
    }catch(error){
      alert('회원가입 실패');
      console.log(error.response ? error.response.data : error.message);
    }
};
  //비밀번호의 조건
  const checkPasswdStrength = (passwd) => {
      const lengthCheck = passwd.length >= 6; // 비밀번호가 6자리 이상인지 체크
      const upperCheck = /[A-Z]/.test(passwd); // 비밀번호에 대문자가 있는지 체크
      const lowerCheck = /[a-z]/.test(passwd); // 비밀번호에 소문자가 있는지 체크
      const numberCheck = /[0-9]/.test(passwd); // 비밀번호에 숫자가 있는지 체크
      return lengthCheck && upperCheck && lowerCheck && numberCheck;
    };
  //비밀번호 조건 실행
  useEffect(() => {
    if(passwd){
    if(!checkPasswdStrength(passwd)){
        setMsg('비밀번호는 6자 이상이여야 하며 대문자, 소문자, 숫자가 포함되어 있어야 합니다.');
    }else{
        setMsg('사용할 수 있는 비밀번호 입니다.');
      }
      setRmsg('');
    }
  },[passwd]);
  //빈칸이 모두 입력되지 않을경우 버튼이 클릭 되지 않게 만드는 함수
  useEffect(() => {
    if(
      id && name && phone && nick && passwd && checkPasswdStrength(passwd) && passwd === Rpasswd
    ){
      setButton(false);
    }else{
      setButton(true);
    }
  },[id, name, phone, nick, passwd, Rpasswd]);

    
    
  return (
    
    <div className={styles.container}>
          <Link to="/"><div className={styles.home}/></Link>
            <div className={styles.header}>
              <header>회원가입</header>
            </div>
              <hr/>
            <form onSubmit={registerSubmit}>
                <div className={styles.formGroup}>
                    <h4>아이디</h4>
                    <input 
                    className={styles.input} 
                    type="text" 
                    value={id}
                    placeholder="아이디를 입력해주세요." 
                    required
                    onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <h4>이름</h4>
                    <input 
                    className={styles.input} 
                    type="text" 
                    value={name}
                    placeholder="이름을 입력해주세요." 
                    required
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <h4>전화번호</h4>
                    <input 
                    className={styles.input} 
                    type="text" 
                    value={phone}
                    placeholder="전화번호를 입력해주세요."
                    required 
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <h4>닉네임</h4>
                    <input 
                    className={styles.input} 
                    type="text" 
                    value={nick}
                    placeholder="사용할 닉네임을 입력해주세요." 
                    required
                    onChange={(e) => setNick(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <h4>이메일</h4>
                    <input 
                    className={styles.input} 
                    type="text" 
                    value={email}
                    placeholder="사용할 이메일을 입력해주세요." 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                  <h4>비밀번호</h4>
                  <input 
                    className={styles.input} 
                    type="password" 
                    value={passwd}
                    placeholder="비밀번호를 입력해주세요." 
                    required
                    onChange={(e) => setPasswd(e.target.value)}
                    />
                </div>
                  <p>{msg}</p>
                <div className={styles.formGroup}>
                    <h4>비밀번호 확인</h4>
                    <input 
                    className={styles.input} 
                    type="password" 
                    id='Rpasswd'
                    value={Rpasswd}
                    placeholder="비밀번호를 재입력해주세요." 
                    required
                    onChange={(e) =>{
                      setRpasswd(e.target.value);
                      if(e.target.value !== passwd){
                        setRmsg('비밀번호가 일치하지 않습니다.');
                      }else{
                        setRmsg('비밀번호가 일치합니다.');
                      }
                    }}
                    />
                </div>
                    <p>{Rmsg}</p>
                    <div className={styles.formGroup}>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      className={styles.genderChk}
                      >           
                      <option value="" disabled>
                        성별 선택
                      </option>
                      <option value="M">남자</option>
                      <option value="F">여자</option>
                   </select>
                </div>
                <button className={styles.button} type="submit" disabled={button}>완료</button>
            </form>
        </div>
       
    );
};

export default Register;