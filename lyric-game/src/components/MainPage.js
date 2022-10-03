/*  The MainPage Component contains the main menu where the instructions are shown
    and the album dropdown is used to select an album.
*/

import Create from './Create'

function MainPage () {
    /*  returns the main menu which displays game instructions and an album selection menu
        which is held in the Create component
    */
    return (
        <div>
            <h1 id="title">
                Taylor Swift Lyric Game
            </h1>
            <h1 id="howtoplay">
                How to play:
            </h1>
    
            <p id ="ins1">
                1. Pick an album from the dropdown. A random lyric from that album will 
                be generated. Select "Any" for all of her songs.
            </p>
            <p id ="ins2">
                2. Use the box to guess the song to which the lyric is from. You have 6 
                guesses to get it correct.
            </p>
            <p id ="ins3">
                3. Press "Play Again" to play another round. You can play as many rounds 
                as you want. Press "Finish Game" to finish the game.
            </p>

            <Create>
            </Create>
        </div>
    );
}
  
  export default MainPage;