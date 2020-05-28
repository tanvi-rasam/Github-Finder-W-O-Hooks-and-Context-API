import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
   
    state={
        text:''
    }


    onChange = (e) => this.setState({[e.target.name]:e.target.value});
    
    static propTypes={
            searchUser:PropTypes.func.isRequired,
            clear:PropTypes.func.isRequired,
            showClear:PropTypes.bool.isRequired,
            setAlert:PropTypes.func.isRequired
    };

    onSubmit =(e) =>{
        e.preventDefault();
        if(this.state.text===''){
            this.props.setAlert(" Please Enter the User ",'light');
        }
        else{
            this.props.searchUser(this.state.text);
        this.setState({text:''});
        }
        
    }

    render (){
        const {clear,showClear}=this.props;
        return (
                <div>
                    <form className="form" onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Search for Users ..." name="text" value={this.state.text}
                        onChange={this.onChange}
                        />
                        <input type="submit" className="btn btn-dark btn-block" value="Search" 
                        
                        />
                    </form>
                    {showClear &&(
                    <button className="btn btn-light btn-block " onClick={clear}>Clear</button>)}
                </div>
              );
        
        }

}

export default Search;