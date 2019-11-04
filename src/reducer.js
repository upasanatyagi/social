export function reducer(state = {}, action) {
    console.log("state", state);
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == "MAKE_FRIENDS") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,

            users: state.users.filter(user => user.id != action.id)
        };
    }

    return state;
}

// ...-spread operator is good for  making copies of arrays and objects
// state={
//     ...state
// }
//
// let arr = [1,2,3]
// let newArr = [..arr,5]
//
// filter is an array method and it loops, good for removing  item and returns new copied array.
//
// map is an array  method.its too loop through array to change one item or all, and it copies the array and create brand new arrays
//
// clone object
