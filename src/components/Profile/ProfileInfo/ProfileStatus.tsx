import React, {ChangeEvent} from "react";
import {ProfileType} from "../../../redux/profile-reducer";


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    /*if (!props.profile) {
        return <Preloader/>
    }*/
    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.props.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })}
    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any): void {
    if (prevProps.status !== this.props.status) {
        this.setState({
            status: this.props.status
        })
    }
        /*let a = this.state
        let b = this.props*/
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.state.status || '----'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}
//this.state.status - важно!!

/*<MapStateToPropsType  & MapDispatchToPropsType & RouteComponentProps>

const mapStateToProps =(state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
    //isAuth: state.auth.isAuth,
})}*/



export type MapStateToPropsType = {
    status: string

}



export type MapDispatchToPropsType = {
    updateStatus: (status: string) => void
}

