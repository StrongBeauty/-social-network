import React, {ChangeEvent} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status ? this.props.status : '',
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.state.status && this.props.updateStatus(this.state.status)
    }
    handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.deactivateEditMode()
        }
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
         this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <div>

                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '----'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onKeyPress={this.handleKeyPress}
                            onChange={this.onStatusChange}
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

export type MapStateToPropsType = {
    status: string
}

export type MapDispatchToPropsType = {
    updateStatus: (status: string) => void
}

