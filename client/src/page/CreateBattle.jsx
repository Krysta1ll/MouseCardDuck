import React from 'react';
import { PageHOC } from '../components';

const CreateBattle = () => {
  return (
    <div>
      
    </div>
  )
};

export default PageHOC(
 CreateBattle,
 <>开始匹配 <br />进行新的战斗</>,
 <>点击匹配<br />并且等待其他玩家加入</>
);