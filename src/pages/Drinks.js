import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";

function Drinks() {
  let drinkValue = 450;

  const [drinks, setDrinks] = useState({});

  const history = useHistory();

  let drinkCost = Array.from({ length: 25 }, () => (drinkValue += 50));

  const clickHandle = (cost, name, setID) => {
    drinkArray.push({ n: name, c: cost, id: itemID });
    itemID++;
    //setDrinks({ n: name, c: cost, id: itemID });
    console.log(drinks);
    console.log(drinkArray);
    if (drinks[setID] === undefined) {
      setDrinks({
        ...drinks,
        [setID]: !drinks[setID],
      });
    }
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
    drinkArray = [];
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
                onClick={() =>
                  clickHandle(drinkCost[item.id - 1], item.name, item.id)
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
          <BoxButton onClick={() => handleClick()}>Next</BoxButton>
        </SmallBox>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Drinks;

export let drinkArray = [];

export let itemID = 0;

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
  background-size: contain;c
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

const CheckMark = styled.path`
  height: 100px;
  width: 100px;
  color: green;
`;
