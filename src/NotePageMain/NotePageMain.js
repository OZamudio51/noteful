import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import PropTypes from 'prop-types';
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = note_id => {
    this.props.history.push(`/${note_id}`)
  }

  render() {
    const { notes=[] } = this.context
    const { note_id } = this.props.match.params
    const note = findNote(notes, note_id) || { content: '' }
    console.log(note)
    console.log(note_id)
    return (
      <section className='NotePageMain'>
        <Note
          id={note.note_id}
          name={note.note_name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n\r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

Note.propTypes = {
  name: PropTypes.string
}


