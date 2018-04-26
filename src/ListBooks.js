import React, {Component} from 'react'
import Book from './Book'

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
                            <Book key={book.id} book={book} onChangeShelf={this.props.onChangeShelf}  defaultShelf={book.shelf}/>
                        ))}
                        </ol>
                    </div>
        ) 
    }
}
export default ListBooks