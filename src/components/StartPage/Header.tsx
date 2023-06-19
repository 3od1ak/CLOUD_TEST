import React from "react";
import { styled } from "styled-components";
import sourceIcon from "../../assets/img/Vector.svg"; // Path to the source icon

const Header = styled.div`
  display: flex;
  margin: 2rem;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background: #d5e4f7;
  border-radius: 100px;
`;

const TextAvatar = styled.span`
  font-weight: 700;
  font-size: 40px;
`;

const TextNearAvatar = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  font-family: "SB Sans Interface", sans-serif;
`;

const AvatarWithNearName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const NameWithSources = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const sourcesData = ["Telegram", "GitHub", "Resume"];

const Sources = styled.div`
  display: flex;
  align-items: center;
`;

const SourceItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  color: #5558fa;
  font-family: "SB Sans Interface", sans-serif;
`;

const SourceIcon = styled.img`
  width: 20.8px;
  height: 19.2px;
  margin-right: 5px;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: #5558fa;
  font-family: "SB Sans Interface", sans-serif;
`;

function StyledHeader() {
  return (
    <Header>
      <AvatarWithNearName>
        <Avatar>
          <TextAvatar>АШ</TextAvatar>
        </Avatar>
        <NameWithSources>
          <TextNearAvatar>Александр Шорохов</TextNearAvatar>
          <Sources>
            {sourcesData.map((source, index) => (
              <SourceItem key={index}>
                <SourceIcon src={sourceIcon} alt="Source Icon" />
                {source === "Telegram" ? (
                  <SourceLink href="https://t.me/3od1ak">Telegram</SourceLink>
                ) : source === "GitHub" ? (
                  <SourceLink href="https://github.com/3od1ak">
                    GitHub
                  </SourceLink>
                ) : (
                  <SourceLink href="https://3od1ak.netlify.app/">
                    Resume
                  </SourceLink>
                )}
              </SourceItem>
            ))}
          </Sources>
        </NameWithSources>
      </AvatarWithNearName>
    </Header>
  );
}

export default StyledHeader;
