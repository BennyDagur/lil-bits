import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";
import { dishList } from "./Dish";

function Order() {
  const [count, setCount] = useState(1);

  const handleClick = (i) => {
    if (count + i > 10 || count + i < 1) {
      return;
    }
    setCount(count + i);
  };

  const [email, setEmail] = useState("");

  const setChange = (change) => {
    setEmail(change.target.value);
  };

  const savedEmail = () => {
    if (/\S+@\S+.\S+/.test(email)) {
      emailList.push({ [email]: { dishList } });
      localStorage.setItem("email", JSON.stringify(emailList));
      console.log(emailList);
    } else console.log("Tis not working");
  };

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <Box>
          <ContainerDiv>
            <p>Yes</p>
            <SmallBox></SmallBox>
          </ContainerDiv>
          <ContainerDiv>
            <CostTxt>Number of people</CostTxt>
            <CountContainer>
              <ArBtn onClick={() => handleClick(-1)}>
                <Arrow viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19l-7-7 7-7"></path>
                </Arrow>
              </ArBtn>
              <p>{count}</p>
              <ArBtn onClick={() => handleClick(1)}>
                <Arrow viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5l7 7-7 7"></path>
                </Arrow>
              </ArBtn>
            </CountContainer>
            <EmailLabel>Input Email Here</EmailLabel>
            <EmailInput onChange={setChange}></EmailInput>
            <BoxButton onClick={() => savedEmail()}>Save Email</BoxButton>
            <BtnLnk to={"/receipt"}>
              <BoxButton onClick={() => (receiptCount = count)}>
                Receipt
              </BoxButton>
            </BtnLnk>
          </ContainerDiv>
        </Box>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Order;

export let receiptCount;

export let emailList = JSON.parse(localStorage.getItem("email") || "[]");

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282c34;
  min-height: 100vh;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BoxButton = styled.button`
  border: transparent;
  color: white;
  font-size: x-large;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  width: 300px;
  background-color: red;
  cursor: pointer;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  height: 600px;
  width: 1250px;
  border: black solid;
  background-color: white;
`;

const SmallBox = styled.div`
  align-self: center;
  height: 250px;
  width: 300px;
  background-color: black;
`;

const ArBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0px;
`;

const CountContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 80px;
`;

const Arrow = styled.svg`
  height: 125px;
  cursor: pointer;
`;

const BtnLnk = styled(Link)`
  align-self: end;
  margin-right: 20px;
`;

const EmailLabel = styled.label`
  margin-left: 10px;
  margin-bottom: 10px;
  color: red;
  font-size: 24px;
  font-weight: bold;
`;

const EmailInput = styled.input`
  height: 40px;
  width: 520px;
  margin-left: 10px;
  margin-bottom: 10px;
  border: black solid 3px;
  color: red;
  font-size: 24px;
`;

const CostTxt = styled.h1`
  margin-left: 10px;
  margin-bottom: -40px;
  color: red;
`;
