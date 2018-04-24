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
function checkDefaultValue(book, onShelf){
    const result = onShelf.filter(e => e.id === book.id)
    if(result.length > 0){
        return result.shelf
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
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  checkBackgroundImage(book)}}></div>
                                        <div className="book-shelf-changer">
                                                <select defaultValue={checkDefaultValue(book, onShelf)} onChange={(e) =>onChangeShelf(book, e.target.value)
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
export default Search