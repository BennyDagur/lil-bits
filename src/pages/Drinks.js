import styled, { keyframes } from "styled-components";
import Header from "../Header";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

let drinkArray = [];
let itemID = 0;

function Drinks() {
  let drinkValue = 450;

  const [drinks, setDrinks] = useState({});

  const history = useHistory();
  const location = useLocation();

  let drinkCost = Array.from({ length: 25 }, () => (drinkValue += 50));

  const drinckClick = (cost, name, setID) => {
    drinkArray.push({ n: name, c: cost, id: itemID });
    itemID++;
    if (drinks[setID] === undefined) {
      setDrinks({
        ...drinks,
        [setID]: !drinks[setID],
      });
    }
  };

  const handleClick = () => {
    if (drinkArray.length === 0) {
      return alert("Pick at least one drink");
    }
    history.push({
      pathname: "/order",

      dish: location.dishList,
      emailNmb: location.emailNmb,
      emailGrab: location.emailGrab,
      drinks: drinkArray,
      drinkID: itemID,
    });
  };

  const [picture, setPicture] = useState();

  const image = async () => {
    const res = await fetch("https://api.punkapi.com/v2/beers");
    const body = await res.json();
    setPicture(body);
  };

  useEffect(() => {
    if (location.emailNmb === undefined) {
      history.push("/");
    } else {
      drinkArray = [];
      image();
    }
  }, []);

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <BigBox>
          {picture ? (
            picture.map((item) => (
              <CardDiv
                key={item.id}
                style={{ backgroundImage: `url(${item.image_url})` }}
                onClick={() =>
                  drinckClick(drinkCost[item.id - 1], item.name, item.id)
                }
              >
                <p>{drinkCost[item.id - 1]}kr</p>
                {drinks[item.id] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <CheckMark
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <DrinkNames>{item.name}</DrinkNames>
              </CardDiv>
            ))
          ) : (
            <p>loading</p>
          )}
        </BigBox>
        <SmallBox>
          <LargeTxt>Click to finish ordering</LargeTxt>
          <BoxButton onClick={() => handleClick()}>Next</BoxButton>
        </SmallBox>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Drinks;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #282c34;
  min-height: 100vh;
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
  height: 50px;
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

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  width: 600px;
  border: black solid;
  background-color: white;
`;

const BigBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: fit-content;
  padding: 10px;
`;

const SmallBox = styled(Box)`
  flex-direction: column;
  height: 350px;
  width: 350px;
  justify-content: space-between;
  padding: 10px;
`;

const LargeTxt = styled.h1`
  color: red;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 40px;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  width: 250px;
  margin: 10px;
  border: solid black 4px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const DrinkNames = styled.p`
  margin: 0px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
`;

const FadeIn = keyframes`
0% {opacity: 0;}
10% {opacity: 0.1;}
30% {opacity: 0.2; }
40% {opacity: 0.5; }
50% {opacity: 0.7; }
70% {opacity: 0.8; }
100% {opacity: 1; }
`;

const CheckMark = styled.path`
  height: 100px;
  width: 100px;
  color: green;
  animation-name: ${FadeIn};
  animation-duration: 0.5s;
`;
