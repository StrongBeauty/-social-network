import {actions, PostType, profileReducer, ProfileType} from "./profile-reducer";

const state = {
    posts: [] as Array<PostType>,
    profile: {} as ProfileType,
    status: '' as string,
}

test('length of posts should be incremented', () => {
    const action = actions.addPost('it.com')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
});

test('message of new post should be corrected', () => {
    const action = actions.addPost('it.com')
    let newState = profileReducer(state, action)
    expect(newState.posts[0].message).toBe('it.com')
});

test('after deleting length of message should be ', () => {
    const action = actions.deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(0)
});

test('after deleting length should not be decrement if id is incorrect', () => {
    const action = actions.deletePost(1000)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(0)
});
