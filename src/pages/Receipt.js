import styled from "styled-components";
import Header from "../Header";
import { useHistory, useLocation } from "react-router-dom";

function Receipt() {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () =>
    history.push({
      pathname: "/",

      dish: location.dish,
      emailNmb: location.emailNmb,
      emailGrab: location.emailGrab,
    });

  const sumWithInitial = location.drinks.reduce(
    (accumulator, currentValue) => accumulator + currentValue.c,
    0
  );

  const overallDishPrice = location.dish.dishPrice * location.receiptCount;

  const overallPrice = overallDishPrice + sumWithInitial;

  console.log(sumWithInitial);
  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <BoxButton onClick={() => handleClick()}>BACK TO HOME</BoxButton>
        <Box>
          <RcpTxt>RECEIPT</RcpTxt>
          <ItmTxt>{location.displayEmail}</ItmTxt>
          <ItmTxt>Pickup time Is {location.time}</ItmTxt>
          <ItmTxt>
            {location.receiptCount} {location.dish.strMeal} {overallDishPrice}kr
          </ItmTxt>
          {location.drinks ? (
            location.drinks.map((item) => (
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
  align-self: end;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
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
  font-size: 36px;
  font-weight: 500;
`;

const ItmTxt = styled(RcpTxt)`
  font-size: 24px;
  font-weight: normal;
`;
