import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import { emailList } from "./Order";
import { emailNumb } from "./Home";

function Dish() {
  const [picture, setPicture] = useState();

  const image = async () => {
    const res = await fetch("https://themealdb.com/api/json/v1/1/random.php");
    const body = await res.json();
    console.log(body);
    setPicture(body.meals[0]);
  };

  const dishClick = (dishImg, dishName, dishTxt) => {
    dishList = {
      strMealThumb: dishImg,
      strMeal: dishName,
      strInstructions: dishTxt,
    };
  };

  useEffect(() => {
    if (Object.values(emailNumb).length != 0) {
      setPicture(emailNumb["dishList"]);
    } else {
      image();
    }
  }, []);

  dishPrice = 2500;

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
            <Link to={"/drinks"}>
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
            </Link>
          </SmallBox>
          <OutButton onClick={() => image()}>Generate new</OutButton>
        </ColumnItems>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Dish;

export let dishPrice;
export let dishList = {};

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
  height: 300px;
  width: 350px;
  align-items: end;
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
