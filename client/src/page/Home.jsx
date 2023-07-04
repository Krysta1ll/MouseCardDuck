import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton, CustomInput, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 });

        setShowAlert({
          status: true,
          type: 'info',
          message: `玩家 ${playerName} 已创建!`,
        });

        setTimeout(() => navigate('/create-battle'), 8000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate('/create-battle');
    };

    if (contract) createPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="昵称"
          placeHolder="请输入昵称"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="注册"
          handleClick={handleClick}
          restStyles="mt-6"
        />

        
      </div>
    )
  );
};

export default PageHOC(
  Home,
  <>
    欢迎来到MouseCardDuck <br /> 这是一个基于web3的nft卡牌游戏
  </>,
  <>
    连接到你的钱包并且开始游戏 <br /> Connect to your wallet and start.
  </>,
);
