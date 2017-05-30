import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import FloatingActionButton from "material-ui/FloatingActionButton";
import InsulinBar from "../components/InsulinBar";
import Divider from "material-ui/Divider";
import Post from "../model/Post";
import PostCard from "../components/PostCard";
import PostDialog from "../dialogs/PostDialog";

export default class Main extends React.Component {
    static pageProperty = {
        title: 'Glucose',
        showSearchBar: false,
        showButtonOkay: false,
        parentPage: null
    };

    constructor(props) {
        super(props);

        this.state = {
            posts: null,
            postModalOpen: false
        };
    }

    handleOpenPostModal() {
        this.setState({postModalOpen: true});
    }

    handleClosePostModal() {
        this.setState({postModalOpen: false});
    }

    appendPost(post) {
        let a = this.state.posts.slice();

        a.unshift(post);

        this.setState({posts: a});
    }

    removePost(post) {
        const index = this.state.posts.indexOf(post);

        if (index === -1)
            return;

        this.state.posts.splice(index, 1);

        this.setState({posts: this.state.posts.slice()});
    }

    editPost(post) {
        const index = (() => {
            for (let i = 0; i < this.state.posts.length; i++) {
                if (this.state.posts[i].id === post.id)
                    return i;
            }

            return -1;
        })();

        if (index === -1)
            return;

        const posts = this.state.posts.slice();
        posts[index] = post;

        this.setState({posts: posts});
    }

    componentDidMount() {
        const _this = this;

        Post.getPosts((posts) => {
            _this.setState({posts: posts})
        });
    }

    render() {
        const that = this;

        const postCards = this.state.posts !== null ? this.state.posts.map(function (post) {
            return (
                <PostCard key={post.id}
                          post={post}
                          handleRemove={post => that.removePost(post)}
                          handleEdit={post => that.editPost(post)}
                />
            );
        }) : null;

        const newPostButton = this.props.loggedInUsername ?
            <RaisedButton label="New Post" onClick={() => this.handleOpenPostModal()}/> : null;

        return (<div>
            <InsulinBar/>
            <div style={{textAlign: "center"}}>
                <FloatingActionButton style={{margin: 30}} secondary={true}
                                      onClick={() => this.props.openPage('FoodsListPage')}>
                    <FontIcon className="material-icons">local_dining</FontIcon>
                </FloatingActionButton>
                <FloatingActionButton>
                    <FontIcon className="material-icons">colorize</FontIcon>
                </FloatingActionButton>
            </div>
            <RaisedButton label="Open Logs" primary={true} style={{marginBottom: 30}} fullWidth={true}/>

            <Divider style={{marginBottom: 35}}/>

            <h2>Forum News</h2>

            {newPostButton}

            <PostDialog open={this.state.postModalOpen}
                        handleClose={() => this.handleClosePostModal()}
                        appendPost={(post) => this.appendPost(post)}
                        loggedInUsername={this.props.loggedInUsername}/>

            <br/>
            <br/>

            {postCards}
        </div>);
    }
}