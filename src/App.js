import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    searchBooks:[],
    books:[],
    query: ''
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) =>{
        this.setState(() => ({
          books
        }))
      });
  }
   updateQuery = (query) => {
        this.setState((currentState) => ({
            query: query
        }))
        if(query.length === 0){
          this.setState({searchBooks: []})
        }
        else{
          this.searchForBooks(query);
        }
    }
  searchForBooks = (query) => {
      BooksAPI.search(query)
      .then((searchBooks) =>{
        this.setState(() => ({
          searchBooks
        }))
      })
      .catch((e) =>{
        this.setState({searchBooks: []})
      })
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((books) =>{
        BooksAPI.getAll()
          .then((books) =>{
            this.setState(() => ({
              books
            }))
          })
      })
  }
  render() {
    const { searchBooks, books, query } = this.state
    return (
      <div className="app">
        <Route path='/search' render={() => (
           <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
                }
                <input 
                  className="search-input"
                  type="text" 
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {query.length > 0 && (
                  <Search books={this.state.searchBooks} onShelf={this.state.books} onChangeShelf={this.changeShelf} />
                )}
              </ol>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf books={this.state.books} shelfStatus="currentlyReading" onChangeShelf={this.changeShelf}/>
                <Bookshelf books={this.state.books} shelfStatus="wantToRead" onChangeShelf={this.changeShelf}/>
                <Bookshelf books={this.state.books} shelfStatus="read" onChangeShelf={this.changeShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
