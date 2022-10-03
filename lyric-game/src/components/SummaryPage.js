/*  The SummaryPage component shows the game statitisitcs after the user chooses to
    finish the game. The user can play as many rounds as they want until they choose
    to stop playing.
*/

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function SummaryPage (props) {
    const nav = useNavigate()

    //metric variables
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)
    const [totGuesses, setTotGuesses] = useState(0)

    /* redirects user back to the home page once the home button is pressed
    */
    const handleClickHome = () => {
        nav('/')
    }

    /* This function retrieves the values from session storage for the metric variables
        that are needed to display the game summary statistics. The metric variables are
        then reset to 0 for the next game.
    */
    function get() {
        var tempScore = sessionStorage.getItem("score-history")
        var tempCount = sessionStorage.getItem("total-history")
        var tempGuesses = sessionStorage.getItem("total-guesses")

        setScore(JSON.parse(tempScore))
        setCount(JSON.parse(tempCount))
        setTotGuesses(JSON.parse(tempGuesses))

        sessionStorage.setItem("score-history", 0)
        sessionStorage.setItem("total-history", 0)
        sessionStorage.setItem("total-guesses", 0)
    }

    /*  as soon as this page is loaded, get the values for the metric variables from the 
        previous page
    */
    useEffect(()=>{
        get()
    }, [])

    //calculate game metrics percent score and average guesses
    var percentScore = score/count*100
    percentScore = percentScore.toFixed(2)

    var avgGuesses = totGuesses/count
    avgGuesses = avgGuesses.toFixed(2)

    /*  returns all the game statistics from all the previous rounds the user played
        one game life cycle
    */
    return (
        <div>
            <h1 id="title">
                Taylor Swift Lyric Game
            </h1>
            <p id="gamesummary">
                Game Summary:
            </p>
            <div>
                <p id="stat1">
                    You got {score} out of {count} songs correct!
                </p>
                <p id="stat2">
                    Accuracy: {percentScore}%
                </p>
                <p id="stat3">
                    Average Guesses per Game: {avgGuesses}
                </p>
            </div>
            <p>
                <button id="home" onClick={handleClickHome}>
                    Home
                </button>
            </p>
        </div>
    );
}
  
export default SummaryPage;