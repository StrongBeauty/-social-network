import React from "react";
import s from "./ProfileInfo.module.css"


export const ProfileInfo = () => {
    return(
        <div>
            <div>
                <img src='http://dgdesign.ru/uploads/posts/2016-04/1461001405_shapka-sayta-gory-34342.jpg'/>
            </div>
            <div className={s.descriptionBlock }>
                <img src='https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkD4vu8-Fg6ETCdZ0BTWekZ6aKTM5SRkZCeTgDn6uOyic'/>
            </div>
        </div>
    )
}

//export default Profile;