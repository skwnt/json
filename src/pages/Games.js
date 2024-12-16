import React from "react";
import Game from "../components/Game";
import gameData from "../json/games.json";

const Games = () => {

    return (
        <>
<div class="flex justify-center items-center min-h-screen">
    <div class="max-w-[720px] mx-auto">
        {gameData.map((game, index) => (
        <Game
         key={index}
         image={game.image}
         url={game.url}
         description={game.description}
         name={game.name}
         />
        ))}
    </div>
</div>
        </>
    )
}

export default Games;