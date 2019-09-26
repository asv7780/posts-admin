import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeHTMLTags} from '../helpers';

class SidebarItemComponent extends React.Component {
    // constructor() {
    //     super();
    // }

    render() {

        const {_post, _index, classes, selectedePostIndex} = this.props;
        return (
            <div key={_index}>
                <ListItem className={classes.listItem}
                          selected={selectedePostIndex === _index}
                          alignItems="flex-start">
                    <div className={classes.textSection}
                         onClick={() => this.selectPost(_post, _index)}>
                        <ListItemText
    primary={_post.title}
    secondary={removeHTMLTags(_post.body.substring(0, 30)) + '...'}/>
                    </div>
                    <DeleteIcon
    onClick={() => this.deletePost(_post)}
    className={classes.deleteIcon}/>
                </ListItem>
            </div>
        );
    }

    selectPost = (p, i) => {
        this.props.selectPost(p, i)
    };

    deletePost = (post) => {
        if(window.confirm(`Are you sure you want to delete post "${post.title}?" `))
            this.props.deletePost(post);
    }
}

export default withStyles(styles)(SidebarItemComponent);
