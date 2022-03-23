import {ContactsType, ProfileType} from "../../../../redux/profile-reducer"
import {Contact} from "./PropfileContact"

type ProfileDataPropsType = Omit<ProfileType, 'userId' | 'photos'>
    & { isOwner: boolean } & { goToEditMode: () => void }

export const ProfileData = ({
                                lookingForAJob,
                                lookingForAJobDescription,
                                fullName,
                                contacts,
                                aboutMe,
                         isOwner,
                         goToEditMode
                     }: ProfileDataPropsType) => {
    return <>
        <div>{fullName}</div>
        <div>
            <b>Looking for a job:</b>
            {lookingForAJob
                ? 'yes'
                : 'no'
            }
        </div>
        <div>
            <b>My professionals skills:</b>
            {lookingForAJobDescription}
        </div>
        <div>
            <b>About me:</b>
            {aboutMe}
        </div>
        <div>
            <b>Contacts:</b>
            {contacts
                && (Object.keys(contacts) as Array<keyof ContactsType>)
                    .map((k: keyof ContactsType) => {
                        return (
                            <Contact
                                key={k}
                                contactValue={contacts[k]}
                                contactTitle={k}
                            />
                        )
                    })}
            {isOwner
                && <div>
                    <button onClick={goToEditMode}>
                        edit
                    </button>
                </div>
            }
        </div>
    </>
}
