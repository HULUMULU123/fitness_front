import React from "react";
import styled from "styled-components";
// import prize from "../../assets/prize.png"; // with import
// import arnold from "../../assets/arnold.jpg"; // with import
import arnold from "../../assets/photo-train.jpg"; // with import
import Unbounded from "../../assets/fonts/Unbounded-VariableFont_wght.ttf";
import { BASE_MEDIA_URL } from "../../utils/constants";
const StyledCardDiv = styled.div`
  margin: 2rem auto;
  width: 90%;

  overflow: hidden;
  display: grid;
  gap: 0.5rem;
  grid-template-areas:
    "a a a a"
    "a a a a"
    "b b c c"
    "b b c c";
`;

const QuoteDiv = styled.div`
  background-color: #7853fb;
  grid-area: a;
  position: relative;
  border-radius: 10px;
  min-height: 120px;
`;

const MyPhotoDiv = styled.div`
  grid-area: b;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const IdealPhotoDiv = styled.div`
  grid-area: c;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const TrainPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// затемнение снизу + текст
const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  display: flex;
  align-items: flex-end;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`;

const GoalText = styled.p`
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

const StyledPrizeImg = styled.img`
  position: absolute;
  top: -2rem;
  right: -3rem;
  width: 200px;
  z-index: 0;
`;

const StyledTextDiv = styled.div`
  width: 90%;
  margin: 1rem auto 0 auto;
  text-align: justify;
`;

const StyledHeader = styled.p`
  font-size: 16px;
  margin: 0;
`;

const StyledQuoteP = styled.p`
  @font-face {
    font-family: "Unbounded";
    src: url(${Unbounded}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  font-family: "Unbounded", sans-serif;
  line-height: 1rem;
  font-size: 10px;
  font-weight: 700;
`;

const StyledAuthorDiv = styled.div`
  /* position: absolute;
  bottom: 0.5rem;
  right: 2rem; */
  max-width: 20%;
  margin: 0.5rem 3rem 0.5rem auto;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const StyledAuthorImg = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: cover;
`;

const StyledAuthorP = styled.p`
  font-size: 10px;
  font-weight: 100;
`;

export default function Quote({ quote, wish }: { quote: any; wish: any }) {
  const ImageUrl = `${BASE_MEDIA_URL}${quote?.image}`;
  console.log("imageUrl", ImageUrl);
  if (!quote) return <p>Ошибка в блоке мотивации</p>;
  return (
    <StyledCardDiv>
      {/* <StyledPrizeImg src={prize} /> */}
      <QuoteDiv>
        <StyledTextDiv>
          <StyledHeader>Цитата дня:</StyledHeader>
          <StyledQuoteP>{quote?.text}</StyledQuoteP>
        </StyledTextDiv>
        <StyledAuthorDiv>
          <StyledAuthorP>{quote?.author}</StyledAuthorP>
          <div
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          >
            <StyledAuthorImg src={ImageUrl} />
          </div>
        </StyledAuthorDiv>
      </QuoteDiv>
      {wish.latest_progress_photo_front && wish?.photo_front ? (
        <>
          <MyPhotoDiv>
            <TrainPhoto
              src={`${BASE_MEDIA_URL}${wish.latest_progress_photo_front}`}
            />
            <GradientOverlay>
              <GoalText>Ты сейчас</GoalText>
            </GradientOverlay>
          </MyPhotoDiv>
          <IdealPhotoDiv>
            <TrainPhoto
              src={`${BASE_MEDIA_URL}${wish.photo_front}`}
              alt="цель"
            />
            <GradientOverlay>
              <GoalText>Твоя цель</GoalText>
            </GradientOverlay>
          </IdealPhotoDiv>
        </>
      ) : (
        ""
      )}
    </StyledCardDiv>
  );
}
