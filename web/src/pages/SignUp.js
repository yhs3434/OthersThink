import React, {Component} from 'react';
import axios from 'axios';

export default class SignUp extends Component {
    state = {
        uname: '',
        pwd: '',
        pwd_chk: '',
        email: '',
        email_chk: ''
    }

    handleSubmit = async (event) => {
        const {uname, pwd, pwd_chk, email} = this.state;
        const data = {
            uname, pwd, pwd_chk, email
        };
        event.preventDefault();
        console.log(data)
        const ret = await axios.post('http://localhost:3001/useraccont/signup', {param: data});
        console.log(ret);
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <label htmlFor="uname">사용자 이름</label>
                        <input type="text" placeholder="사용자 이름" name="uname" value={this.state.uname} onChange={this.handleChange} required />
                        <label htmlFor="pwd">비밀번호</label>
                        <input type="password" placeholder="비밀번호" name="pwd" value={this.state.pwd} onChange={this.handleChange} required />
                        <label htmlFor="pwd">확인</label>
                        <input type="password" placeholder="확인" name="pwd_chk" value={this.state.pwd_chk} onChange={this.handleChange} required />
                        <div>
                            <input type="email" placeholder="이메일 주소" name="email" value={this.state.email} onChange={this.handleChange} required/>
                            <button type="button" className="certbtn">보내기</button>
                        </div>
                        <input type="number" placeholder="인증 번호" name="email_chk" required/>
                        <button type="submit">가입</button>
                    </div>
                    <div className="containerBottom" style={{backgroundColor:'#f1f1f1'}}>
                        <button type="button" className="cancelbtn">Cancel</button>
                        <span></span>
                    </div>
                </form>
            </div>
        )
    }
}