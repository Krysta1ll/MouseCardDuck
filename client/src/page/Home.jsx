import React from 'react';
import { PageHOC } from '../components';

const Home = () => {
  return (
    <div>
      
    </div>
  )
};

export default PageHOC(
 Home,
 <>欢迎来到MouseCardDuck <br />这是一个基于web3的nft卡牌游戏</>,
 <>连接你的nft钱包然后开始游戏<br />享受史诗级的卡牌体验</>
);