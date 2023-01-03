import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../Header";
import { emailList } from "./Order";
import Carousel from "react-carousel-minimal/dist/components/Carousel";

function Home() {
  const [email, setEmail] = useState("");

  const checkChange = (change) => {
    setEmail(change.target.value);
  };

  const checkEmail = () => {
    for (let i = 0; i < emailList.length; i++) {
      if (email in emailList[i]) {
        emailNumb = emailList[i][email];
        console.log(emailList[i][email]);
      }
    }
  };

  const data = [
    {
      image:
        "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
      caption: `
                  Apple Frangipan Tart`,
    },
    {
      image:
        "https://www.themealdb.com/images/media/meals/xqrwyr1511133646.jpg",
      caption: "Salted Caramel Cheescake",
    },
    {
      image:
        "https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg",
      caption: "Key Lime Pie",
    },
  ];

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <BigBox>
          <Carousel
            data={data}
            width="850px"
            height="350px"
            automatic={true}
            time={2000}
            dots={true}
          />
        </BigBox>
        <SmallBox>
          <LargeTxt>ORDER FLOW BOX</LargeTxt>
          <Link to={"/dish"}>
            <BoxButton>ORDER</BoxButton>
          </Link>
        </SmallBox>
      </ContainerDiv>
      <ContainerDiv>
        <Box>
          <LargeTxt>FIND YOUR ORDER</LargeTxt>
          <EmailLabel>ENTER EMAIL</EmailLabel>
          <EmailInput onChange={checkChange}></EmailInput>
          <LButton onClick={() => checkEmail()}>FIND</LButton>
        </Box>
        <Box>
          <ClearButton onClick={() => localStorage.clear}>
            Clear all Emails
          </ClearButton>
        </Box>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Home;

export let emailNumb = "";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #282c34;
  min-height: 105vh;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BoxButton = styled.button`
  border: transparent;
  color: white;
  font-size: x-large;
  border-radius: 20px;
  height: 60px;
  width: 300px;
  background-color: red;
  margin-bottom: 25px;
  cursor: pointer;
`;

const LButton = styled(BoxButton)`
  margin-right: 50px;
  align-self: end;
`;

const ClearButton = styled(BoxButton)`
  margin-top: auto;
  margin-bottom: auto;
  align-self: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  height: 350px;
  width: 600px;
  border: black solid;
  background-color: white;
`;

const BigBox = styled(Box)`
  margin-top: 30px;
  width: 850px;
`;

const SmallBox = styled(Box)`
  margin-top: 30px;
  width: 350px;
  justify-content: space-between;
  align-items: center;
`;

const Arrow = styled.svg`
  height: 125px;
  cursor: pointer;
`;

const ArBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0px;
`;

const LargeTxt = styled.h1`
  color: red;
  margin-left: 20px;
  margin-right: 20px;
`;

const EmailLabel = styled.label`
  margin-left: 20px;
  margin-bottom: -30px;
  color: red;
  font-size: 26px;
  font-weight: bold;
`;

const EmailInput = styled.input`
  height: 40px;
  width: 520px;
  margin-left: 20px;
  border: black solid 3px;
  color: red;
  font-size: 24px;
`;
