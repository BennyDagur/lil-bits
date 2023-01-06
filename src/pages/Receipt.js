import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header";
import { dishPrice, dishList } from "./Dish";
import { drinkArray } from "./Drinks";
import { receiptCount, timeExport, displayEmail } from "./Order";

function Receipt() {
  console.log(receiptCount);

  const sumWithInitial = drinkArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue.c,
    0
  );

  const overallDishPrice = dishPrice * receiptCount;

  const overallPrice = overallDishPrice + sumWithInitial;

  console.log(sumWithInitial);
  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <HomeLink to={"/"}>
          <BoxButton>BACK TO HOME</BoxButton>
        </HomeLink>
        <Box>
          <RcpTxt>RECEIPT</RcpTxt>
          <ItmTxt>{displayEmail}</ItmTxt>
          <ItmTxt>Pickup time Is {timeExport}</ItmTxt>
          <ItmTxt>
            {receiptCount} {dishList.strMeal} {overallDishPrice}kr
          </ItmTxt>
          {drinkArray ? (
            drinkArray.map((item) => (
              <ItmTxt key={item.id}>
                {item.n} {item.c}kr
              </ItmTxt>
            ))
          ) : (
            <p>loading</p>
          )}
          <ItmTxt>{overallPrice}kr</ItmTxt>
        </Box>
      </ContainerDiv>
    </MainDiv>
  );
}

export default Receipt;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #282c34;
  min-height: 100vh;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 35%;
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

const HomeLink = styled(Link)`
  align-self: end;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 40px;
  min-height: 600px;
  width: 400px;
  border: black solid;
  background-color: white;
`;

const RcpTxt = styled.p`
  margin-left: 10px;
  color: red;
  font-size: 30px;
  font-weight: 500;
`;

const ItmTxt = styled(RcpTxt)`
  font-size: 20px;
  font-weight: normal;
`;
