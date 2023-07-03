import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { CustomButton, PageHOC } from '../components';
import styles from '../styles';

const JoinBattle = () => {
  const navigate = useNavigate();
  const { contract, gameData, setShowAlert, setBattleName, setErrorMessage, walletAddress } = useGlobalContext();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);

  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName);

      setShowAlert({ status: true, type: 'success', message: `正在加入 ${battleName}` });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <h2 className={styles.joinHeadText}>正在等待加入的战斗:</h2>

      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length
          ? gameData.pendingBattles
            .filter((battle) => !battle.players.includes(walletAddress) && battle.battleStatus !== 1)
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>{index + 1}. {battle.name}</p>
                <CustomButton
                  title="加入"
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            )) : (
              <p className={styles.joinLoading}>刷新以显示新的对局</p>
          )}
      </div>

      <p className={styles.infoText} onClick={() => navigate('/create-battle')}>
        或新建一场对局
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>加入 <br /> 一场战斗</>,
  <>进入已经被创建的对局</>,
);
