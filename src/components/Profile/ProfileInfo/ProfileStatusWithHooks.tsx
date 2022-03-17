import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateStatus} from "../../../redux/profile-reducer";

type ProfileStatusPropsType = {
    status: string
}

export const ProfileStatusWithHooks = ({status}: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(status)

    const dispatch = useDispatch()

    useEffect(() => {
        setNewStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(newStatus))
    }
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            deactivateEditMode()
        }
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updateStatus = e.currentTarget.value
        const updateStatusTrim = updateStatus.trim()
        setNewStatus(updateStatusTrim)

    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || '----'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        onKeyPress={handleKeyPress}
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={newStatus}/>
                </div>
            }
        </div>
    )
}

