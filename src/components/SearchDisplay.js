import React from 'react';

const SearchDisplay = (props) => {
console.log(props)
    //add ternary for if there is no picture in the display

    return(
      <div>
        {props.results.map(article => (
         <div>
         <h2> <a href={article.web_url}>{article.headline.main}</a></h2>

          {/* ternary is setup like this: 
                {something ? if true do this : if not true do this}  
          */}
          {/* {photo is here ? display photo : display a messsage} */}

          {article.multimedia[0] ? <img src={`https://nytimes.com/${article.multimedia[0].url}`} /> : null}
          {article.keywords.map(keys => (
            <li>{keys.value}</li>
          ))}
        </div>
        ))}
      </div>
    )
}

export default SearchDisplay;