import { useEffect, useState } from "react";

import { UserActions } from "./UserListConstants";
import UserDetails from "./user-details/UserDetails";
import UserItem from "./user-item/UserItem";
import UserEdit from "./user-edit/UserEdit";
import UserCreate from "./user-create/UserCreate";
import * as userService from "../../services/userService";
import UserDelete from "./user-delete/UserDelete";


export default function UserList() {
    const [userAction, setUserAction] = useState({ user: {}, action: {} });
    const [users, setUsers] = useState([]);
    useEffect(() => {
        userService.getAll()
            .then(usrs => setUsers(usrs));
    }, []);

    function actionHadler(id, userAction) {
        if (userAction !== UserActions.Add) {
            userService.getUserById(id)
                .then(usr => {
                    setUserAction({
                        user: usr,
                        action: userAction
                    });
                })
        } else {
            setUserAction({
                user: {},
                action: userAction
            });
        }
    }

    function closeModalHandler() {
        setUserAction({ user: {}, action: {} });
    }

    function userCreateHandler(userData) {
        userService.createUser(userData)
            .then(user => {
                setUsers(oldUsers => [...oldUsers, user])
                closeModalHandler();
            });
    }

    function userEditHandler(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const {
            _id,
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            ...address } = Object.fromEntries(formData);
        const user = {
            _id,
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            address
        }

        userService.updateUser(user)
            .then(user => {
                setUsers(oldUsers => oldUsers.map(u => u._id === user._id ? user : u))
                closeModalHandler();
            });
    }

    function deleteUserHandler(id) {
        userService.deleteUser(id)
            .then(userId => {
                setUsers(oldUsers => oldUsers.filter(x => x._id !== userId));
                closeModalHandler();
            });
    }

    return (
        <>
            <div className="table-wrapper">
                {userAction.action === UserActions.Details &&
                    <UserDetails
                        user={userAction.user}
                        onClose={closeModalHandler}
                    />
                }

                {userAction.action === UserActions.Edit &&
                    <UserEdit
                        user={userAction.user}
                        onSubmit={userEditHandler}
                        onClose={closeModalHandler}
                    />
                }

                {userAction.action === UserActions.Delete &&
                    <UserDelete
                        id={userAction.user._id}
                        onDelete={deleteUserHandler}
                        onClose={closeModalHandler}
                    />
                }

                {userAction.action === UserActions.Add &&
                    <UserCreate
                        onClose={closeModalHandler}
                        onUserCreate={userCreateHandler}
                    />
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(usr => {
                            return (
                                <tr key={usr._id}>
                                    <UserItem
                                        user={usr}
                                        onActionClick={actionHadler}
                                    />
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <button
                className="btn-add btn"
                onClick={() => actionHadler({}, UserActions.Add)}
            >
                Add new user
            </button>
        </>
    );
}
