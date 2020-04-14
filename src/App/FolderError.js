import React from 'react';

export default class FolderError extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return false;
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Folders not found. Please try again later.</h2>
            );
        }
        return this.props.children;
    }
}