import ReactTooltip from 'react-tooltip';
import styles from '../styles';

const healthPoints = 25;

const healthLevel = (points) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');
const marginIndexing = (index) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

const PlayerInfo = ({ player, playerIcon, mt }) => (
  <div className={`${styles.flexCenter} ${mt ? 'mt-4' : 'mb-4'}`}>
    <img data-for={`Player-${mt ? '1' : '2'}`} data-tip src={playerIcon} alt="player02" className="w-14 h-14 object-contain rounded-full" />

    <div
      data-for={`Health-${mt ? '1' : '2'}`}
      data-tip={`生命值: ${player.health}`}
      className={styles.playerHealth}
    >
      {[...Array(player.health).keys()].map((item, index) => (
        <div
          key={`player-item-${item}`}
          className={`${styles.playerHealthBar} ${healthLevel(player.health)} ${marginIndexing(index)}`}
        />
      ))}
    </div>

    <div
      data-for={`Mana-${mt ? '1' : '2'}`}
      data-tip="法力值"
      className={`${styles.flexCenter} ${styles.glassEffect} ${styles.playerMana}`}
    >
      {player.mana || 0}
    </div>

    <ReactTooltip id={`Player-${mt ? '1' : '2'}`} effect="solid" backgroundColor="#7f46f0">
      <p className={styles.playerInfo}>
        <span className={styles.playerInfoSpan}>昵称:</span> {player?.playerName}
      </p>
      <p className={styles.playerInfo}>
        <span className={styles.playerInfoSpan}>地址:</span> {player?.playerAddress?.slice(0, 10)}
      </p>
    </ReactTooltip>
    <ReactTooltip id={`Health-${mt ? '1' : '2'}`} effect="solid" backgroundColor="#7f46f0" />
    <ReactTooltip id={`Mana-${mt ? '1' : '2'}`} effect="solid" backgroundColor="#7f46f0" />
  </div>
);

export default PlayerInfo;
