import React, {Component} from 'react'
import Book from './Book'

function checkDefaultValue(book, onShelf){
    const result = onShelf.filter(e => e.id === book.id)
    if(result.length > 0){
        return result[0].shelf
    }
    else{
        return 'none'
    }
}
class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            books: this.props.books,
            onShelf: this.props.onShelf
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ books: nextProps.books });  
    }
    render(){
        const { onShelf, onChangeShelf } = this.props;
        const { books } = this.state;
        return(
      
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {books.map((book) => (
                            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} defaultShelf={checkDefaultValue(book, onShelf)} />
                        ))}
                        </ol>
                    </div>
        ) 
    }
}
export default Search