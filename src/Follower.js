import styled from 'styled-components';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Card = styled.div`
    background-color: #2c3035;
    border-radius: 20px;
    box-shadow: rgba(23, 25, 29, 0.3) 0 2px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 800px;
    width:350px;
    height:350px;
    margin: 50px;
`

const Profile = styled.image`
    margin-top: 20px;
    border: 2px solid #646568;
    border-radius: 50%;
    height: 180px;
    width:180px;
    background: url(${(props)=>props.src});
    background-size: 180px;
`

const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap:wrap;
`

function Follower() {
    const [data, setData] = useState();
    useEffect(async () => {
        try{
            const response = await axios.get(`https://api.github.com/users/${window.localStorage.getItem("ID")}/followers`);
            setData(response.data);
        }
        catch(e){
            console.log("error");
        }
    }, []);

    return(
        <Wrapper>
            {data?.map((follower,i) => 
                <Card>
                    <Profile src={follower.avatar_url}/>
                    <h3 style={{color:"white", margin:"7px"}}>{follower.login}</h3>
                    <p style={{color:"white", height:"10px", margin:"15px"}}>{follower.company}</p>
                    <a href={follower.html_url} style={{color:"lightblue"}}>프로필로 이동</a>
                </Card>
            )}
        </Wrapper>
    );
}

export default Follower;