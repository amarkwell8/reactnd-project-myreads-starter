import React, { Component } from 'react'

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
class Book extends Component {
    render() {
        const { shelfStatus, onChangeShelf } = this.props;
        return (
            <li key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: checkBackgroundImage(this.props.book) }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={this.props.defaultShelf} onChange={(e) => onChangeShelf(this.props.book, e.target.value)
                            }>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    {this.props.book.authors && (this.props.book.authors.map((author) => (
                        <div key={author} className="book-authors">{author}</div>
                    )))}
                </div>
            </li>
        )
    }
}

export default Book