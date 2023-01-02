import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";

function Home() {
  let drinkValue = 450;

  const history = useHistory();

  drinkArray = [];

  let drinkCost = Array.from({ length: 25 }, () => (drinkValue += 50));

  const clickHandle = (cost, name) => {
    drinkArray.push({ n: name, c: cost });
    console.log(drinkArray);
  };

  const handleClick = () => {
    if (drinkArray.length === 0) {
      return;
    }
    history.push("/order");
  };

  const [picture, setPicture] = useState();

  const image = async () => {
    const res = await fetch("https://api.punkapi.com/v2/beers");
    const body = await res.json();
    setPicture(body);
    console.log(body);
  };

  useEffect(() => {
    image();
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
                onClick={() => clickHandle(drinkCost[item.id - 1], item.name)}
              >
                <p>{drinkCost[item.id - 1]}kr</p>
                <DrinkNames>{item.name}</DrinkNames>
              </CardDiv>
            ))
          ) : (
            <p>loading</p>
          )}
        </BigBox>
        <SmallBox>
          <BoxButton onClick={() => handleClick()}>Next</BoxButton>
        </SmallBox>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Home;

export let drinkArray = [];

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
  align-self: end;
  cursor: pointer;
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
  height: 350px;
  width: 350px;
  align-items: end;
  padding: 10px;
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
`;

const DrinkNames = styled.p`
  margin: 0px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
`;
