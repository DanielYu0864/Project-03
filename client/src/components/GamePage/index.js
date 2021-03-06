import React, {useState, useEffect}from 'react'
import GameContainer from '../GameContainer';
import Button from '../Category/Button';
import Navbar from '../Navbar/Navbar';

function GamePage({gameList, user_id}) {
  //* set state
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [gameArr, setGameArr] = useState([]);
  const [game, setGame] = useState({});
  const [gameChoose, setGameChoose] = useState(false);
  //* re-render component everytime when state changed
  useEffect(() => {
    if(gameList !== []) {
      checkLoading();
    }
  });
  //* re-render component when game chose
  useEffect(() => {
    checkLoading();
  }, [gameChoose, game]);
  //* make sure loading properly
  const checkLoading = async () => {
    await setGameArr(gameList);
    await setUserId(user_id);
    await setLoading(false);
  }
  //* change game state to the game data when button click
  const gameChosen = async (id) => {
    let gameInfo = gameArr.filter(e => e.id === id);
    await setGame(gameInfo[0]);
    await setGameChoose(true);
  };
  //* back to the game choose page
  const backToOptions = async () => {
    await setGameChoose(false);
  }
  //* check loading
  if(loading === true) {
    return <h1>Loading ...</h1>
  }
  //* check game chose
  if(gameChoose) {
    return <GameContainer
      user_id={userId}
      game={game}
      backToOptions={backToOptions}
    />
  }
  //* else render button
  return (

    <main>
        <Navbar color='white' />
        <section className='category games'>
          <h2 className='category__title'>Games</h2>
            <div className='category__container'>
                {
                  gameArr.map(e => (
                    <Button border='#fff' onClick={() => gameChosen(e.id)} key={e.id}>{e.title}</Button>
                  ))
                }
            </div>
        </section>
    </main>

  )

}

export default GamePage;
