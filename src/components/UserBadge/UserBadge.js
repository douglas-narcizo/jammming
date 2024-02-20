import './UserBadge.css';

function UserBadge(props) {
    if (props.user.id) {
        return <div className="User-badge black"><img src={props.user.images[0].url} alt=""></img> {props.user.id}</div>        
    } else {
        return <div className="User-badge" id="Login" onClick={props.logged}>Log in</div>
    }
}

export default UserBadge;