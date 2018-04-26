import React, {Component} from 'react'
import ListBooks from './ListBooks'

class Bookshelf extends Component{
    constructor(props){
        super(props);
        this.state = {
            books: this.props.books,
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ books: nextProps.books });  
    }
    render(){
        const { shelfName, shelfStatus, onChangeShelf } = this.props;
        return(
         <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <ListBooks books={this.state.books} shelfStatus={shelfStatus}
                        onChangeShelf={onChangeShelf}
                    />
                </ol>
            </div>
        </div>
        )
    }
}

export default Bookshelf