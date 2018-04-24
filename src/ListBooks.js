import React, {Component} from 'react'

function checkBackgroundImage(book){
    if(book.imageLinks){
        return (
            `url(${book.imageLinks.thumbnail})`
        )
    }
    else{
        return(
            ''
        )
    }
}

class ListBooks extends Component{
    render(){
        const { books, shelfStatus, onChangeShelf } = this.props;
        const currentShelf = shelfStatus;
        return(
      
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {books.filter(function(book){
                            return book.shelf === currentShelf;
                        }).map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: checkBackgroundImage(book)}}></div>
                                        <div className="book-shelf-changer">
                                                <select defaultValue={book.shelf} onChange={(e) =>onChangeShelf(book, e.target.value)
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
                                   {book.authors && (book.authors.map((author) =>(
                                        <div key={author} className="book-authors">{author}</div>
                                   )))}
                                </div>
                            </li>
                        ))}
                        </ol>
                    </div>
        ) 
    }
}
export default ListBooks