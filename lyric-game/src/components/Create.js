/*  The Create component contains the dropdown menu for the album that the user
    needs to choose in order to grab the random lyric
*/

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Create (props) {
    const nav = useNavigate()

    const [album, setAlbum] = useState('Any');

    /*  redirects the user to the lyric game page once the album is submitted, 
        passing the album name to the SecondaryPage.
    */
    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('')

        nav('/lyricgame', 
        {
            state: {
                album: album,
            },
        })
    }

    /*  Returns dropdown menu for all of Taylor's Swifts Albums + button to submit album choice
    */
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select
                    id="album_select"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                >
                    <option value="Any">Any</option>
                    <option value="Taylor Swift">Taylor Swift</option>
                    <option value="Fearless">Fearless</option>
                    <option value="Speak Now">Speak Now</option>
                    <option value="Red">Red</option>
                    <option value="1989">1989</option>
                    <option value="Reputation">Reputation</option>
                    <option value="Lover">Lover</option>
                    <option value="Folklore">Folkore</option>
                    <option value="Evermore">Evermore</option>
                </select> 
                <button type="submit" id="album_button">
                    Enter
                </button>
            </form>
        </div>
    );
}
  
export default Create;