/*  The SecondaryPage component contains the actual lyric guessing game and the game loop.
    A lytric is shown, which is grabbed from the backend, and the user can type their guesses 
    into the guess box and have 6 attempts to answer correctly> there are also buttons to give 
    up, play again, and finish the game.
*/

import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function SecondaryPage (props) {
    const location = useLocation()
    const nav = useNavigate()

    const [data, setData] = useState(null);
    const [result, setResult] = useState(null)

    //keep track of guesses
    const [guess, setGuess] = useState('')
    const [previous, setPrevious] = useState('')

    //keep track of metrics (metric variables)
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)
    const [curGuesses, setCurGuesses] = useState(1)
    const [totGuesses, setTotGuesses] = useState(1)

    //keep track of game state
    const [isDone, setIsDone] = useState(false)
    const [isGiveUp, setIsGiveUp] = useState(false)

    //receive selected album from MainPage
    const album = location.state.album
    

    /*  if play again  button is pressed, redirect user back to the MainPage where the 
        user can re select album and play again.
    */
    const handlePlayAgain = () => {
        nav('/')
    }

    /*  store metric variables in the session so they can be passed to the SummaryPage
        and displayed for the user to see game summary. function also navigates to the
        summary page
    */
    function store () {
        sessionStorage.setItem("score-history", JSON.stringify(score))
        sessionStorage.setItem("total-history", JSON.stringify(count))
        sessionStorage.setItem("total-guesses", JSON.stringify(totGuesses))

        nav('/summary')
    }
    
    /*  metric variables are set to the values of previous games of the same session
        so that they can be used to track metrics across multiple games before the user
        selects to end the game
    */
    useEffect(()=>{
        const dataScore = sessionStorage.getItem("score-history")
        const dataCount = sessionStorage.getItem("total-history")
        const dataGuesses = sessionStorage.getItem("total-guesses")

        if (dataScore != null && dataCount != null && dataGuesses != null) {
            setScore(JSON.parse(dataScore))
            setCount(JSON.parse(dataCount))
            setTotGuesses(JSON.parse(dataGuesses))
        }
    }, [])

    /*  store metric variables in the session  anytime one of these 3 variables:
        score, count, totGuesses are changed so that all changes are tracked
    */
    useEffect(()=>{
        sessionStorage.setItem("score-history", JSON.stringify(score))
        sessionStorage.setItem("total-history", JSON.stringify(count))
        sessionStorage.setItem("total-guesses", JSON.stringify(totGuesses))
    }, [score, count, totGuesses])

    /*  As soon as an album is picked, generate a random lyric from the backend and set 
        the count of total games to + 1.
    */
    useEffect(()=>{
        setCount(count => count + 1)
        apiGenerate()
    }, [])

    /*  This async function generates a random lyric from the selected album by pulling a lyric 
        from the backend.The backend has a Taylor Swift API that generates all the random 
        lyrics. The lyric, song, and album are stored in the data variable.
    */
    async function apiGenerate(){
        fetch("http://localhost:3001/grablyric?" + new URLSearchParams({
        album: album}))
        .then((res)  => res.json())
        .then((data) => setData(data))
    }

    /*  This async function compares the user's guess to the actual song. If the user is correct,
        the current round is finished and the user's score is incremented. If the user is
        wrong, the round continues until the user reaches 6 wrong guessdes, where the round
        is then stopped.

    */
    async function checkGuess() {
        if (guess.toLowerCase() === data.song.toLowerCase()){
            setResult("Correct! You got it in "+ JSON.stringify(curGuesses) + " guesses!")
            setIsDone(true)
            setScore(score => score + 1)
          }
          else{
            setResult("Incorrect!")
            setIsDone(false)
          }

          if (curGuesses === 6){
            setIsDone(true)
            setResult("Incorrect! You are out of guesses.")
        }
    }

    /*  handles the actions once a guess is submitted. It increments the guesses
        and sets the previous guess to the current guess for display, and then it checks
        if the guess is correct.
    */
    const handleSubmit = (e) => {
        e.preventDefault()
        setPrevious(guess)
        setCurGuesses(curGuesses => curGuesses + 1)
        setTotGuesses(totGuesses => totGuesses + 1)
        checkGuess()

        console.log(data.song)
    }

    /*  handles the give up button by setting isGiveUp to true once the user chooses the give
        up, thus alowing the current round to end so the user can play again or end the game
    */
    const handleGiveUp = () => {
        setIsGiveUp(true)
    }

    /*  Run the game loop: lyric is shown, user has 6 guesses to guess correctly, options to
        play again or end the game are shown
    */
    return (
        <div>
            <h1 id="title">
                Taylor Swift Lyric Game
            </h1>
            <p id="showalbum">
                Album: {album}
            </p>
            <p id="lyrictitle">
                Lyrics:
            </p>
            <p id="lyric">
                {!data ? "Loading..." : data.quote}
            </p>

            <p>
                {isDone || isGiveUp ? (
                    <div className ='FinalResult'>
                        <p id="showsong">
                            Song: {data.song}
                        </p>
                        <p id="result">
                            {!result ? "" : result}
                        </p>
                    </div> 
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <input
                                id="guessbox"
                                type="text"
                                required
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                            />
                            <button id="guessenter" type="submit">
                                Enter
                            </button>
                            <p id="result">
                                {!result ? "" : result}
                            </p>
                            <p id="prevguess">
                                Previous guess: {previous}
                            </p>
                            <p>
                                <button id="giveup" onClick={handleGiveUp}>
                                GIVE UP
                                </button>
                            </p>
                        </form>
                    </>
                )}
            </p>

            <p>
                <button id="playagain" onClick={handlePlayAgain}>
                Play Again
                </button>
            </p>
            <p>
                <button id="finishgame" onClick={store}>
                    Finish Game
                </button>
            </p>
        </div>
    );
}
  
export default SecondaryPage;