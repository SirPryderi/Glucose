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
        this.authorId = json_data.author_id;
        this.authorUsername = json_data.username;
    }

    getAvatarUrl(size) {

        if (typeof size === "undefined")
            size = 40;

        return "https://api.adorable.io/avatars/" + size + "/" + this.authorId + ".png"
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