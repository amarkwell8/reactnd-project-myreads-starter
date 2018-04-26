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
        const { shelfStatus, onChangeShelf } = this.props;
        return(
         <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfStatus}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <ListBooks books={this.state.books} shelfStatus={shelfStatus}
                        onChangeShelf={this.props.onChangeShelf}
                    />
                </ol>
            </div>
        </div>
        )
    }
}

export default Bookshelf