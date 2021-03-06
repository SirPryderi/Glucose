/**
 * Created by Vittorio on 13/05/2017.
 */
import axios from "axios";

export default class Post {
    constructor(json_data) {
        this.id = json_data.id;
        this.title = json_data.title;
        this.body = json_data.body;
        this.date = json_data.date;
        if (typeof json_data.author_id !== "undefined")
            this.authorId = json_data.author_id;
        if (typeof json_data.authorId !== "undefined")
            this.authorId = json_data.authorId;
        if (typeof json_data.username !== "undefined")
            this.authorUsername = json_data.username;
        if (typeof json_data.authorUsername !== "undefined")
            this.authorUsername = json_data.authorUsername;
    }

    getAvatarUrl(size) {
        return Post.getAvatar(this.authorId, size);
    }

    static getAvatar(id, size) {
        if (typeof size === "undefined")
            size = 40;

        return "https://api.adorable.io/avatars/" + size + "/" + id + ".png"
    }

    static addPost(title, text, callback) {
        axios.post('api/addPost.php', {
            title: title,
            body: text
        })
            .then(function (response) {
                if (response.data.status === "success") {
                    response.data.post = new Post(response.data.post);
                }
                callback(response.data)
            })
            .catch(function (error) {
                console.error(error);
                callback({status: "error", message: "General failure. " + error});
            })
    }

    static removePost(id, callback) {
        axios.post('api/removePost.php', {
            id: id
        })
            .then(function (response) {
                if (response.data.status === "success") {
                    response.data.post = new Post(response.data.post);
                }
                callback(response.data)
            })
            .catch(function (error) {
                console.error(error);
                callback({status: "error", message: "General failure. " + error});
            })
    }

    static editPost(post, callback) {
        axios.post('api/editPost.php', {
            id: post.id,
            body: post.body,
            title: post.title
        })
            .then(function (response) {
                if (response.data.status === "success") {
                    response.data.post = new Post(response.data.post);
                }
                callback(response.data)
            })
            .catch(function (error) {
                console.error(error);
                callback({status: "error", message: "General failure. " + error});
            })
    }

    static getPosts(callback) {
        axios
            .get("api/posts.php")
            .then(function (result) {
                const posts = [];

                result.data.forEach((post) => {
                    posts.push(new Post(post));
                });

                callback(posts);
            })
    }
}