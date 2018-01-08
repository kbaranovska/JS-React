var React = require('react');

require('./NotesSearch.css');

var NoteSearch = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
        this.props.onNoteSearch(event.target.value);
    },

    render: function() {
        return (
            <div className="note-search">
                <textarea
                    placeholder="Search your note..."
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
            </div>
        );
    }
});

module.exports = NoteSearch;
