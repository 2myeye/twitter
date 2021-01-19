import { dbService } from 'fbase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm('are you sure?');
        if (ok) {
            //delete tweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        } else {
            //cancel delete process
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    }

    const onChange = (e) => {
        const { value } = e.target;
        setNewNweet(value);
    }

    const toggleEditing = () => {
        setEditing(prev => {
            return !prev;
        })
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type='text'
                            value={newNweet}
                            placeholder="Edit your nweet"
                            onChange={onChange}
                            required
                        />
                        <input
                            type='submit'
                            value='update'
                        />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <input
                                    type="button"
                                    value="delete"
                                    onClick={onDeleteClick}
                                />
                                <input
                                    type="button"
                                    value="edit"
                                    onClick={toggleEditing}
                                />
                            </>)
                        }
                    </>
                )}
        </div>
    )
}

export default Nweet;