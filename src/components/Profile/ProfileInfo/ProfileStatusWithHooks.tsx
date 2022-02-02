import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = ({
                                           status,
                                           updateStatus
                                       }: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(status)

    useEffect(() => {
        setNewStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
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

/*    componentDidUpdate(prevProps
:
    Readonly < ProfileStatusPropsType >, prevState
:
    Readonly < {} >, snapshot ? : any
):
    void {
        if(prevProps.status !== this.props.status
)
    {
        this.setState({
            status: this.props.status
        })
    }
}*/


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

export type MapStateToPropsType = {
    status: string
}

export type MapDispatchToPropsType = {
    updateStatus: (status: string) => void
}

