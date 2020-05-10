import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import { Redirect } from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddNoteStyle.css';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            note_name: '',
            contents: '',
            chosenFolder: '',
            redirect: false,
        };
    }

    static contextType = ApiContext;

    updateNoteName(note_name) {
        this.setState({ note_name: note_name });
      }
    
      updateContents(contents) {
        this.setState({ contents:  contents });
      }
    
      updateChosenFolder(chosenFolder) {
        this.setState({ chosenFolder: chosenFolder });
      }
    
      formSubmitRedirect() {
        this.setState({redirect: true});
        this.renderRedirect();
      }

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to='/' />;
        }
    }

    handleNoteSubmit = e => {
        e.preventDefault();

        if (this.state.note_name.length === 0) {
            return alert('Please enter a note name');
        } 
        else if (this.state.contents.length === 0) {
            return alert('Please enter the contents of the note');
        }

        const newNote = {
            note_name: this.state.note_name,
            content: this.state.contents,
            folder_id: this.state.chosenFolder,
            modified: new Date(),
        };

        fetch(`${config.API_ENDPOINT}/api/notes`, {
            method: "POST",
            body: JSON.stringify(newNote),
            headers: {
              "content-type": "application/json"
            }
          })
          .then(res => {
            if (!res.ok) 
            return res.json()
            .then(e => Promise.reject(e));
            return res.json();
          })
          .then((newNote) => {
            this.context.addNote(newNote);
            this.formSubmitRedirect()
          })
            .catch(error => {
              console.error({ error });
            });
    };


    render () {
        const folders = this.context.folders;

        return (
            <>
                {this.renderRedirect()}
                <form className='addNote'>
                    <label htmlFor='noteName'>Name</label>
                    <input type='text' id='noteName' onChange={e => this.updateNoteName(e.target.value)} required
                    />
                    <label htmlFor='contents'>contents go here...</label>
                    <input type='text' id='contents' onChange={e => this.updateContents(e.target.value)}  
                    />
                    <label htmlFor='folder'>Assigned Folder</label>
                    <select id='chosenFolder' onChange={e => this.updateChosenFolder(e.target.value)}>
                    <option value="" disabled selected hidden>Choose a folder</option>
                        {folders.map(choice => (<option key={choice.id} value={choice.id}>{choice.folder_name}</option>))};
                    </select>
                    <button type='submit' onClick={this.handleNoteSubmit} className='addSubmit'>
                        Add Note
                    </button>
                </form>
                <CircleButton tag='button' role='link' onClick={() => this.props.history.goBack()} className='Add-back-button'>
                    <FontAwesomeIcon icon='chevron-left' />
                    {' '}
                    Back
                </CircleButton>
            </>
        );
    }
}
