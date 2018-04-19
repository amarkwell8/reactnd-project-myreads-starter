import React, {Component} from 'react'

class ListBooks extends Component{
    render(){
        const { books, shelfStatus } = this.props;
        const currentShelf = this.props.shelfStatus;
        return(
      
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.props.books.filter(function(book){
                            return book.status === currentShelf;
                        }).map((book) => (
                            <li key={book.title}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.coverUrl})` }}></div>
                                        <div className="book-shelf-changer">
                                                <select value={book.status}>
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.author}</div>
                                </div>
                            </li>
                        ))}
                        </ol>
                    </div>
        ) 
    }
}
export default ListBooks