import styled from "styled-components";

const Headline = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  margin: 0;
  padding: 20px;
  text-align: center;
  z-index: 1;

  border-bottom: 1px solid lightgrey;
  background-color: #1a2b4c;
  color: #f5f5f5;
`;

export default function TitleBar() {
  return <Headline>Tourio</Headline>;
}
