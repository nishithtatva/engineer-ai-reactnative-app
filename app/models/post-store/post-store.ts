import { Instance, SnapshotOut, types, flow, getSnapshot, applySnapshot } from "mobx-state-tree"
import { Api } from '../../services/api'
import { omit, length } from "ramda";

const api = new Api();
api.setup();

export const PostStoreModel = types
    .model("PostStore")
    .props({
        posts: types.optional(types.frozen(), null),
        page: 0,
        loading: false,
        postDetails: types.optional(types.frozen(), null),
    })
    .actions(self => ({
        updatePostDetails(post: any) {
            self.postDetails = post;
        },
        getPosts: flow(function* getPosts() {
            try {
                self.loading = true;
                const data = yield api.getPosts(self.page);
                self.posts = data.posts.hits;
                self.loading = false;
            } catch (erro) {
                self.loading = false;
            }
        }),
        getLoadMorePosts: flow(function* getLoadMorePosts() {
            try {
                self.loading = true;
                self.page = self.page + 1;
                const data = yield api.getPosts(self.page);
                const postList = [...self.posts, ...data.posts.hits];
                self.posts = postList;
                self.loading = false;
            } catch (erro) {
            }

        })

    }))
    .postProcessSnapshot(omit(["page", "posts"]))

/**
 * The RootStore instance.
 */
export interface PostStore extends Instance<typeof PostStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface PostStoreSnapshot extends SnapshotOut<typeof PostStoreModel> { }