var React = require('react');
var NoteEditor = require('./NoteEditor.jsx');
var NotesGrid = require('./NotesGrid.jsx');
var NotesSearch = require('./NotesSearch.jsx');

require('./NotesApp.css');

var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            searchWord: ''
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        var newNotes = localNotes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
        this._updateLocalStorage(newNotes);

        this.handleNoteSearch(this.state.searchWord);
    },

    handleNoteAdd: function(newNote) {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        var newNotes = localNotes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
        this._updateLocalStorage(newNotes);

        this.handleNoteSearch(this.state.searchWord);
    },

    handleNoteSearch: function(searchWord) {
        this.setState({ searchWord: searchWord });

        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (searchWord) {
            localNotes = localNotes.filter(function(note) {
                return note.text.indexOf(searchWord) !== -1;
            });
        }

        if (localNotes) {
            this.setState({ notes: localNotes });
        } 
    },

    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">Google Keep</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <h2 className="app-header">Searching</h2>
                <NotesSearch onNoteSearch={this.handleNoteSearch} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
});

module.exports = NotesApp;