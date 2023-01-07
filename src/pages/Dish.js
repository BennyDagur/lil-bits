import styled from "styled-components";
import Header from "../Header";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Dish() {
  const [picture, setPicture] = useState();

  const history = useHistory();
  const location = useLocation();

  let dishPrice = 2500;

  const image = async () => {
    const res = await fetch("https://themealdb.com/api/json/v1/1/random.php");
    const body = await res.json();
    console.log(body);
    setPicture(body.meals[0]);
  };

  const dishClick = (dishImg, dishName, dishTxt) => {
    history.push({
      pathname: "/drinks",

      dishList: {
        strMealThumb: dishImg,
        strMeal: dishName,
        strInstructions: dishTxt,
        dishPrice: dishPrice,
      },

      emailNmb: location.emailNmb,
      emailGrab: location.emailGrab,
    });
  };

  useEffect(() => {
    if (location.emailNmb.length !== 0) {
      setPicture(location.emailNmb["dishList"]);
    } else {
      image();
    }
  }, []);

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <StackDiv>
          {picture && <RstrainImg src={picture.strMealThumb} />}
          <BigBox>
            <ColumnItems>
              <RowItems>
                {picture && <HeadTxt>{picture.strMeal}</HeadTxt>}
                <HeadTxt>{dishPrice}kr</HeadTxt>
              </RowItems>
              {picture && <p>{picture.strInstructions}</p>}
            </ColumnItems>
          </BigBox>
        </StackDiv>
        <ColumnItems>
          <SmallBox>
            <LargeTxt>Click to purchase drink/s</LargeTxt>
            <BoxButton
              onClick={() =>
                dishClick(
                  picture.strMealThumb,
                  picture.strMeal,
                  picture.strInstructions
                )
              }
            >
              Next
            </BoxButton>
          </SmallBox>
          <OutButton onClick={() => image()}>Generate new</OutButton>
        </ColumnItems>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Dish;

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
  align-self: center;
  width: 90%;
`;

const ColumnItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeadTxt = styled.h1`
  margin-left: 10px;
  margin-right: 20px;
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
`;

const OutButton = styled(BoxButton)`
  margin-top: 20px;
  margin-left: 35px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  width: 30%;
  border: black solid;
  background-color: white;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const BigBox = styled(Box)`
  margin-top: 0;
  width: 650px;
`;

const SmallBox = styled(Box)`
  flex-direction: column;
  height: 300px;
  width: 350px;
  justify-content: space-between;
`;

const LargeTxt = styled.h1`
  color: red;
  margin-left: 20px;
  margin-right: 20px;
`;

const RstrainImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  height: 300px;
  width: 650px;
  background-color: white;
  border: black solid;
`;
