import Title from "../pages/User";
import {ADMIN_ACCESS_LEVEL} from "../constants/access";
import React from "react";

const UserCard = ({ accessLevel, user }) => {
    return <div>
        <Title>{ accessLevel === ADMIN_ACCESS_LEVEL ? 'Edit user' : 'User info' }</Title>
        <div className='card newCard shadow'>
            <div className="card-header">
                <SimpleInput value={title}
                             maxLength={MAX_TITLE_LENGTH}
                             onChange={changeTitleHandler}
                             className={isValid('title') ? '' : 'is-invalid'}
                />
            </div>
            <div className="card-body">
                <SimpleTextarea value={text}
                                maxLength={MAX_TEXT_LENGTH}
                                onChange={changeTextHandler}
                                className={isValid('text') ? '' : 'is-invalid'}
                />
                <div className="btn-group btn-group-lg btn-block">
                    <button type="button" className="btn btn-secondary mt-3" onClick={saveHandler}>
                        Save
                    </button>
                    <button type="button" className="btn btn-danger mt-3" onClick={removeHandler}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>;
}