import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';
import { player01, player02 } from '../assets';
import styles from '../styles';

const GameLoad = () => {
  const { walletAddress, gameData,contract } = useGlobalContext();
  const navigate = useNavigate();
  
  // useEffect(()=>{
  //  navigate('/create-battle');
  // });

  const stopWaiting = async()=>{
    navigate('/create-battle');
   const battleName = gameData.pendingBattles[0].name;
   console.log(battleName);
   console.log(walletAddress);
    try {

      const battle=await contract.getBattle(battleName);
      console.log(battle);
      
      await contract.quitBattle(battleName);
      // await contract.deleteBattle(battleName);
      navigate('/');
    } catch (error) {
       
       console.log('err');
    }

  };
  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        
        <CustomButton
          title="选择背景"
          handleClick={() => navigate('/battleground')}
          restStyles="mt-6"
        />
        
      </div>

      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          正在匹配 <br /> 旗鼓相当的对手...
        </h1>
        <p className={styles.gameLoadText}>
          Tips：在匹配过程中，你可以选择自己喜欢的背景
        </p>

        <div className={styles.gameLoadPlayersBox}>
          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player01} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>
              {walletAddress.slice(0, 30)}
            </p>
          </div>

          <h2 className={styles.gameLoadVS}>Vs</h2>

          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player02} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>??????????</p>
          </div>
        </div>

        <div className="mt-10">
          <p className={`${styles.infoText} text-center mb-5`}>或</p>

          <CustomButton
            title="加入其他已创建的战斗"
            handleClick={() => navigate('/join-battle')}
          />
          
          <CustomButton
            title="停止匹配"
            handleClick={() => stopWaiting()}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
