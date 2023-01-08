import styled from "styled-components";
import Header from "../Header";
import Carousel from "react-carousel-minimal/dist/components/Carousel";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

let emailList = JSON.parse(localStorage.getItem("Emails") || "[]");

let emailNumb = "";
let emailGrab = "";

function Home() {
  const history = useHistory();

  console.log(emailNumb);

  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(emailList);
    emailList = JSON.parse(localStorage.getItem("Emails") || "[]");
    emailNumb = "";
    emailGrab = "";
  }, []);

  const checkChange = (change) => {
    setEmail(change.target.value);
  };

  const checkEmail = () => {
    for (let i = 0; i < emailList.length; i++) {
      if (email === emailList[i].email) {
        emailGrab = emailList[i];
        emailNumb = emailGrab[email];
        console.log(emailGrab.email);
        history.push({
          pathname: "/dish",

          emailNmb: emailNumb,
          emailGrab: emailGrab,
        });
      }
    }
  };

  const handleClick = () => {
    history.push({
      pathname: "/dish",

      emailNmb: emailNumb,
      emailGrab: emailGrab,
    });
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
          <LargeTxt>Click to purchase a dish</LargeTxt>
          <BoxButton onClick={() => handleClick()}>ORDER</BoxButton>
        </SmallBox>
      </ContainerDiv>
      <ContainerDiv>
        <Box>
          <LargeTxt>FIND YOUR ORDER</LargeTxt>
          <EmailLabel>ENTER EMAIL</EmailLabel>
          <EmailInput onChange={checkChange}></EmailInput>
          <LButton onClick={() => checkEmail()}>FIND</LButton>
        </Box>
        <ImageBox
          style={{
            backgroundImage: `url(https://images.punkapi.com/v2/24.png)`,
          }}
        ></ImageBox>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Home;

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
  border: solid black 3px;
  &:hover {
    background-color: #ea4b48;
  }
  &:active {
    background-color: #e41f1b;
    border: solid black 4px;
  }
`;

const LButton = styled(BoxButton)`
  margin-right: 50px;
  align-self: end;
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

const ImageBox = styled.img`
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
  background-size: contain;
  background-repeat: space;
  background-position: center;
`;

const BigBox = styled(Box)`
  margin-top: 30px;
  width: 850px;
`;

const SmallBox = styled(Box)`
  margin-top: 30px;
  width: 350px;
  align-items: center;
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
