import React from 'react';
import './App.css';
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

const firebase = require('firebase');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedPostIndex: null,
            selectedPost: null,
            posts: null
        }
    }

    render() {
        return (
            <div className="app-container">
                <SidebarComponent
                    selectedPostIndex={this.state.selectedPostIndex}
                    posts={this.state.posts}
                    deletePost={this.deletePost}
                    selectPost={this.selectPost}
                    newPost={this.newPost}/>
                {
                    this.state.selectedPost ?
                        <EditorComponent
                            selectedPost={this.state.selectedPost}
                            selectedPostIndex={this.state.selectedPostIndex}
                            posts={this.state.posts}
                            postUpdate={this.postUpdate}/> :
                        null
                }
            </div>
        );
    }

    componentDidMount = () => {
        firebase
            .firestore()
            .collection('posts')
            .onSnapshot(serverUpdate => {
                const posts = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data['id'] = _doc.id;
                    return data;
                });
                this.setState({
                    posts: posts
                })
            })

    };

    selectPost = (post, index) => {
        this.setState({
            selectedPostIndex: index,
            selectedPost: post
        })
    };

    postUpdate = (id, postObj) => {
        firebase
            .firestore()
            .collection('posts')
            .doc(id)
            .update({
                title: postObj.title,
                body: postObj.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    };

    newPost = async (title) => {
        const post = {
            title: title,
            body: ''
        };
        const newFromDB = await firebase
            .firestore()
            .collection('posts')
            .add({
                title: post.title,
                body: post.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        const newId = newFromDB.id;
        await this.setState({
            posts: [...this.state.posts, post]
        });
        const newPostIndex = this.state.posts.indexOf(this.state.posts.filter(_post => _post.id === newId)[0]);
        this.setState({
            selectedPost: this.state.posts[newPostIndex],
            selectedPostIndex: newPostIndex
        })
    };

    deletePost = async (post) => {
        const postIndex = this.state.posts.indexOf(post);
        await this.setState({posts: this.state.posts.filter(_post => _post !== post)});
        if (this.state.selectedPostIndex === postIndex) {
            this.setState({selectedPostIndex: null, selectedPost: null});
        } else {
            this.state.posts.length > 1 ?
                this.selectPost(this.state.posts[this.state.selectedPostIndex - 1], this.state.selectedPostIndex - 1) :
                this.setState({selectedPostIndex: null, selectedPost: null});
        }
        firebase
            .firestore()
            .collection('posts')
            .doc(post.id)
            .delete();
    }
}

export default App;
