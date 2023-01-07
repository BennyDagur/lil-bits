import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

function Header() {
  let location = useLocation();
  let pathname = location.pathname;

  const style = {
    [pathname]: {
      color: "red",
    },
  };
  return (
    <ContainerDiv>
      <Logo src="http://ih1.redbubble.net/image.181146356.8650/sticker,375x360.u1.png" />
      <TopMenu style={style["/dish"]}>Dish</TopMenu>
      <TopMenu style={style["/drinks"]}>Drinks</TopMenu>
      <TopMenu style={style["/order"]}>Order</TopMenu>
      <TopMenu style={style["/receipt"]}>Receipt</TopMenu>
    </ContainerDiv>
  );
}

export default Header;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TopMenu = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  margin-left: 42px;
  margin-right: 42px;
  height: 50px;
  width: 175px;
  color: white;
  background-color: black;
  border: black solid;
  border-radius: 8px;
  font-size: x-large;
`;

const Logo = styled.img`
  margin-left: 40px;
  width: 200px;
`;
