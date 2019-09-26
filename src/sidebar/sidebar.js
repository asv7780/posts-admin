import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import {Button, List} from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';


class SidebarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            addingPost: false,
            title: null
        }
    }

    render() {
        const {posts, classes, selectedPostIndex} = this.props;

        if (posts) {
            return (
                <div className={classes.sidebarContainer}>
                    <Button
                        onClick={this.newPostBtnClick}
                        className={classes.newPostBtn}>{this.state.addingPost ? 'Cancel' : 'New Post'}</Button>
                    {
                        this.state.addingPost ?
                            <div>
                                <input
                                    type="text"
                                    className={classes.newPostInput}
                                    placeholder="Enter post title"
                                    onKeyUp={(e) => this.updateTitle(e.target.value)}
                                />
                                <Button
                                    className={classes.newPostSubmitBtn}
                                    onClick={this.newPost}>Add post</Button>
                            </div> :
                            null
                    }
                    <List>
                        {
                            posts.map((_post, _index) => {
                                return (
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _post={_post}
                                            _index={_index}
                                            selectedPostIndex={selectedPostIndex}
                                            selectPost={this.selectPost}
                                            deletePost={this.deletePost}
                                        />
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }

    newPostBtnClick = () => {
        this.setState({
            title: null,
            addingPost: !this.state.addingPost
        })
    };

    updateTitle = (text) => {
        this.setState({title: text})
    };

    newPost = () => {
        this.props.newPost(this.state.title);
        this.setState({
            title: null,
            addingPost: false
        });
    };

    selectPost = (p, i) => {
        this.props.selectPost(p, i)
    };

    deletePost = (post) => {
        this.props.deletePost(post);
    };
}

export default withStyles(styles)(SidebarComponent)
