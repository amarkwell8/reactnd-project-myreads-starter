import React, {Component} from 'react'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {books: this.props.books}
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillRecieveProps")
        this.setState({ books: nextProps.books });  
    }
    render(){
        const { onChangeShelf } = this.props;
        const { books } = this.state;
        return(
      
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.title + book.authors}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                                <select defaultValue="none" onChange={(e) =>onChangeShelf(book, e.target.value)
                                                    }>
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                        </ol>
                    </div>
        ) 
    }
}
export default Search