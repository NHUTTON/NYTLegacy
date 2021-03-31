import React from 'react';

type Props = {
  results: any
}

const SearchDisplay = (props: Props) => {
console.log(props)
    //add ternary for if there is no picture in the display

    return(
      <div>
        {props.results.map((article: any) => (
         <div>
         <h2> <a href={article.web_url}>{article.headline.main}</a></h2>

          {/* ternary is setup like this: 
                {something ? if true do this : if not true do this}  
          */}
          {/* {photo is here ? display photo : display a messsage} */}

          {article.multimedia[0] ? <img src={`https://nytimes.com/${article.multimedia[0].url}`} /> : null}
          <h3>Keywords:</h3>
          {/* {if keywords ? map the words and print : "no keywords found"} */}
          {props.results[0].keywords[0] !== null ? <p> {article.keywords.map((keys: any) => (
          <li>{keys.value}</li>))}</p> : <p>"No keywords found"</p>}
        </div>
        ))}
      </div>
    )
  }
  
export default SearchDisplay;