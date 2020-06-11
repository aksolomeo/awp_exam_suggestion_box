const users = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_USER':
            return { username: action.user.username, fullName: action.user.fullName };
        default:
            return state;
    }
}

export default users;