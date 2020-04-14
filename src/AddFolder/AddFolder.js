import React from 'react';
import { Redirect } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../config';
import CircleButton from '../CircleButton/CircleButton';
// import AddFolderStyle from '.AddFolderStyle';

class AddFolder extends React.Component {
    constructor(props){
        super(props)
        this.state={
            folderName: '',
            redirect: false
        }
    }

    static contextType= ApiContext;

    updateFolderName(folderName) {
        this.setState({folderName : folderName});
        console.log(this.state.folderName)
    }

    formSubmitRe() {
        this.setState({redirect: true});
        this.renderRe();
    }

    renderRe = () => {
        if(this.state.redirect) {
            return <Redirect to ='/' />
        }
    }

    handleFolderSubmit = e => {
        e.preventDefault();
        if(this.state.folderName.length === 0) {
            alert('Please enter a folder name')
            return;
        }
        const newFolder = {
            name: this.state.folderName
        };
        console.log(newFolder);

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if(!res.ok)
                return res.json().then(e => Promise.reject(e));
                return res.json()
            })
            .then((newFolder) => {
                this.context.AddFolder(newFolder);
                this.formSubmitRe();
            })
            .catch(error => {
                console.error({ error });
            });
    }
    
    render() {
        return (
            <div className='App'>
                {this.renderRe()}
                <form className='addFolder'>
                    <label htmlFor='folderName'>Name</label>
                    <input type='text' id='folderName' onChange={e => this.updateFolderName(e.target.value)} />
                    <button type='submit' onClick={this.handleFolderSubmit} className='addSubmit'>Add Folder</button>
                </form>
                <CircleButton tag='button' role='link' onClick={() => this.props.history.goBack()} className='Add-back-button'>
                    <FontAwesomeIcon icon='chevron-left' />
                    {' '}
                    Back
                </CircleButton>
            </div>
        );
    }
}

export default AddFolder;