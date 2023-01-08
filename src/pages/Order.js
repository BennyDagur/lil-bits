import styled from "styled-components";
import Header from "../Header";
import DateTimePicker from "react-datetime-picker";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

let emailList = JSON.parse(localStorage.getItem("Emails") || "[]");
let displayEmail = "";
let receiptCount = "";

function Order() {
  const history = useHistory();
  const location = useLocation();

  const dishList = location.dish;

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
      for (let i = 0; i < emailList.length; i++) {
        if (email in emailList[i]) {
          emailList[i] = { [email]: { dishList }, email: email };
          displayEmail = email;
          alert("Email Updated");
          localStorage.setItem("Emails", JSON.stringify(emailList));
          return;
        }
      }
      emailList.push({ [email]: { dishList }, email: email });
      displayEmail = email;
      alert("Email Submitted");
      localStorage.setItem("Emails", JSON.stringify(emailList));
    } else {
      alert("Invalid Email Entered");
    }
  };

  const [value, valueChange] = useState(new Date());

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const checkTime = () => {
    return (
      value.getDay() !== 0 &&
      value.getDay() !== 6 &&
      value.getHours() >= 16 &&
      value.getHours() < 23
    );
  };

  const toReceipt = () => {
    if (displayEmail.length === 0) {
      alert("Invalid Email");
    } else if (checkTime()) {
      receiptCount = count;
      let timeExport = value.toLocaleDateString("en-gb", options).toString();
      history.push({
        pathname: "/receipt",

        dish: location.dish,
        emailNmb: location.emailNmb,
        emailGrab: location.emailGrab,
        drinks: location.drinks,
        drinkID: location.drinkID,
        time: timeExport,
        receiptCount: receiptCount,
        displayEmail: displayEmail,
      });
    } else return alert("Not a valid date");
  };

  useEffect(() => {
    if (location.emailNmb === undefined) {
      history.push("/");
    } else {
      if (location.emailGrab.length !== 0) {
        console.log(location.emailNmb);
        for (let i = 0; i < emailList.length; i++) {
          if (location.emailGrab.email === emailList[i].email) {
            location.emailNmb["dishList"] = dishList;
            emailList[i] = location.emailGrab;
            displayEmail = location.emailGrab.email;
            localStorage.setItem("Emails", JSON.stringify(emailList));
            console.log("worked");
            return;
          }
        }
      }
      displayEmail = "";
    }
  }, []);

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <Box>
          <ToTop>
            <TimeTxt>
              Pick time for pickup between Monday to Friday and hours 16:00 to
              23:00
            </TimeTxt>
            <DateTimePicker
              onChange={valueChange}
              value={value}
              minDate={new Date()}
              locale="en-gb"
              disableClock={true}
              clearIcon={null}
              calendarIcon={null}
            />
          </ToTop>
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
            <BtnLnk onClick={() => toReceipt()}>Receipt</BtnLnk>
          </ContainerDiv>
        </Box>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Order;

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

const TimeTxt = styled.h1`
  color: red;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 32px;
`;

const ToTop = styled(ContainerDiv)`
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  border-right: solid black 2px;
  font-size: 30px;
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
  border: solid black 3px;
  &:hover {
    background-color: #ea4b48;
  }
  &:active {
    background-color: #e41f1b;
    border: solid black 4px;
  }
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

const BtnLnk = styled(BoxButton)`
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
  margin-left: 15px;
  margin-bottom: -40px;
  color: red;
`;
