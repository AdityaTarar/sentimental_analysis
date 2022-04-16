import React, { useState, useEffect } from 'react';
// import './App.css';
// import positiveGIF from './images/positive.gif';
// import negativeGIF from './images/negative.gif';
// import neutralGIF from './images/neutral.gif';

import Sentiment from 'sentiment';
const sentiment = new Sentiment();

function SentimentAnalysis(props) {

  const [phrase, setPhrase] = useState('');
  const [sentimentScore, setSentimentScore] = useState(null);
  
  useEffect(() => {
    setSentimentScore(sentiment.analyze(phrase));
  }, [phrase]);
console.log(sentimentScore)
  return (
    <div className="App">
      <header className="App-header">
        {
          sentimentScore !== null ?
            <p>Sentiment Score: {sentimentScore.score}</p>
            : ''
        }

        {
          sentimentScore ?
            sentimentScore.score === 0 ?
              <div>happy</div>
              :
              sentimentScore.score > 0 ?
                <div>medium</div>
                :
                <div>not happy</div>
            : ''
        }

      </header>
    </div>
  );
}

export default SentimentAnalysis;