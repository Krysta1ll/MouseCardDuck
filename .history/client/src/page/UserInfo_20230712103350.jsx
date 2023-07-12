import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { CustomButton, PageHOC } from '../components';
import styles from '../styles';

const UserInfo = () =>{
    const { contract, setErrorMessage , walletAddress} = useGlobalContext();
    
    const navigate = useNavigate();
    const [userName_now,setUserName_now] = useState([]);
    useEffect(() => {
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
    
      },[contract]);

      const infoClick = async () => {
        try {
          navigate('../');
        }catch(error){
 
            setErrorMessage(error);
 
        }
 
 
 
 
   };

return (
<>
  <>
      <div className="flex flex-col mb-5">
        <p className={`flex ${styles.headText} head-text`}>个人信息</p>
       <div>
       <p className={`${styles.normalText} my-10`}>用户名：{userName_now}<br/>您的钱包地址:{walletAddress}<br/></p>
       
       </div>
       <CustomButton
          title="返回"
          handleClick={infoClick}
          restStyles="mt-6"
        />
      </div>
     
    </>
  
</>
);

}

export default PageHOC (
UserInfo,



)



