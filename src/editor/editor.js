import React from 'react';
import ReactQuill from 'react-quill';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';


class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        }
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedPost.body,
            title: this.props.selectedPost.title,
            id: this.props.selectedPost.id
        })
    };

    componentDidUpdate = () => {
        if(this.props.selectedPost.id !== this.state.id) {
            this.setState({
                text: this.props.selectedPost.body,
                title: this.props.selectedPost.title,
                id: this.props.selectedPost.id
            })
        }
    };

    render() {

        const {classes} = this.props;
        return (
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                    type="text"
                className={classes.titleInput}
                    placeholder='Post title...'
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => this.updateTitle(e.target.value)}
                />
                <ReactQuill
                    value={this.state.text}
                    onChange={this.updateBody}>

                </ReactQuill>
            </div>
        );
    }
    updateBody = async (val) => {
        await this.setState({text: val});
        this.update();
    };

    updateTitle = async (text) => {
        await this.setState({title: text});
        this.update();
    };

    update = debounce(() => {
        this.props.postUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text
        })
    }, 1500);

}

export default withStyles(styles)(EditorComponent);
