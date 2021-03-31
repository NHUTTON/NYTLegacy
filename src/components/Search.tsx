import React, {ChangeEvent, Component, FormEvent} from 'react';
import SearchDisplay from './SearchDisplay'

type AcceptedProps ={
  
}

type SearchState = {
    searchTerm: string,
    startDate?: string,
    endDate?: string,
    pageNumber: number
    results: []
}

export default class Search extends Component<AcceptedProps, SearchState> {
    constructor(props: AcceptedProps) {
        super(props)
            this.state= {
                searchTerm: "",
                startDate: "",
                endDate: "",
                pageNumber: 0,
                results: []
            }
    } 

    // componentDidUpdate() {
    //     if (this.state.startDate || this.state.endDate !== null) {
    //        this.setState({
    //             startDate: this.state.startDate,
    //             endDate: this.state.endDate
    //        })
    //     }
    // }

    fetchResults = (e: FormEvent) => {
        e.preventDefault()
        const baseUrl: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
        const key: string = "p1fuW2JiWK5eDK7grKTTTY79sysiQwKd"
        
        let url: string = `${baseUrl}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`
        
        if (this.state.startDate !== "") {
            url += '&begin_date' + this.state.startDate
        }

        if (this.state.endDate !== "") {
            url += '&end_date' + this.state.endDate
        }

        console.log(url)
        console.log(typeof(this.state.endDate))

        fetch(url)
        .then(res => res.json()) 
        .then(json => {
            console.log(json)
            this.setResults(json)
        })
    }
    
    setResults(json: any) {
        this.setState({
            results: json.response.docs
        })
    }

    searchFunction (e: ChangeEvent<HTMLInputElement>) {
        const input = e.target.value
        this.setState({
            searchTerm: input
    })
    }

    startDateFunction(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target.value
        this.setState({
            startDate: input
        })
    }

    endDateFunction(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target.value
        this.setState({
            endDate : input
        })
    }

    // updateResults(e:any) {
    //     this.setState({
    //         results: e.json.docs
    //     })
    // }

    nextPage = async (e: any) => {
            await this.setState({
                pageNumber: (this.state.pageNumber +1)
            })
            this.fetchResults(e)
        }

    previousPage =async (e: any) => {
        if (this.state.pageNumber > 0) {
            await this.setState({
                pageNumber: (this.state.pageNumber - 1)
            })
        } else {
            return;
        }
        this.fetchResults(e);
    }


    render() {
        return(
            <div>
                <form onSubmit={this.fetchResults}>
                    <input placeholder='search' onChange={e => this.searchFunction(e)}/>
                    <label>Start Date: </label>
                    <input type='date' name="startDate" id='startDate' onChange={e => this.startDateFunction(e)} />
                    <label>End Date: </label>
                    <input type='date' name='endDate' id='endDate' onChange={e => this.endDateFunction(e)}/>
                    <button type="submit">Search</button>
                </form>
                <button onClick={e => this.previousPage(e)}>Previous</button>
                <button onClick={e => this.nextPage(e)}>Next</button>
                {/* {this.state.pageNumber +1} */}
                <SearchDisplay results={this.state.results} />
            </div>
        )
    }
} 
