const Comment = ({ comment }) => {
    return (
        <li className="comment">
            <p>{comment.user.email}: {comment.comment}</p>
        </li>
    );
}
export default Comment;