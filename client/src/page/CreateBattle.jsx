import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context';
import { CustomButton, CustomInput, GameInfo, GameLoad, PageHOC, PlayerInfo } from '../components';


const CreateBattle = () => {
  const { contract, gameData, battleName, setBattleName, setErrorMessage , walletAddress} = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();
  const [userName_now,setUserName_now] = useState([]);
  
 
  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }


     console.log(gameData);
    //const player = contract.getPlayer(walletAddress);
    const getPlayerInfo = async () => {
      try {
        const players = await contract.getPlayer(walletAddress); // 假设getAllPlayers是您合约中的有效方法
        //console.log(players); // 对players数据进行操作
        
        setUserName_now(players.playerName);
       
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getPlayerInfo();

  }, [gameData],[contract]);
  
  const handleClick = async () => {
    if (battleName === '' || battleName.trim() === '') return null;

    try {
      await contract.createBattle(battleName);

      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

//个人信息按钮事件
  const infoClick = async () => {
       try {
         navigate('../user-info');
       }catch(error){

           setErrorMessage(error);

       }




  };
  return (
    <>
      {waitBattle && <GameLoad />}

      <div className="flex flex-col mb-5">
        <CustomInput
          label={"您好,MouseDuck："+userName_now}
          placeHolder="请输入对局名称"
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton
          title="创建对局"
          handleClick={handleClick}
          restStyles="mt-6"
        />

<CustomButton
          title="个人信息"
          handleClick={infoClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate('/join-battle')}>
        或加入已创建的对局
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>创建 <br /> 一场新的对局</>,
  <>创建你的对局并等待他人加入<br/>或者在此期间查看您的个人信息</>,
  
);
