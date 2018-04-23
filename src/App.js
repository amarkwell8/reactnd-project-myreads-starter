import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    searchBooks:[],
    books:[],
    query: '',
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
            query: query.trim()
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
    const { searchBooks, books, query, showSearchPage } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
                  <Search books={this.state.searchBooks} onChangeShelf={this.changeShelf} />
                )}
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                 <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        <ListBooks books={this.state.books} shelfStatus="currentlyReading" 
                          onChangeShelf={this.changeShelf}
                        />
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        <ListBooks books={this.state.books} shelfStatus="wantToRead" 
                           onChangeShelf={this.changeShelf}
                        />
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        <ListBooks books={this.state.books} shelfStatus="read" 
                           onChangeShelf={this.changeShelf}
                        />
                      </ol>
                    </div>
                  </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
