import { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom";

import Comment from "../comment/Comment";

import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

import { useAuthContext } from "../../contexts/AuthContext";
import { useGameContext } from "../../contexts/GameContext";

const Details = () => {
    const [comment, setComment] = useState('');
    const { gameId } = useParams();
    const { addComment, fetchGameDetails, selectGame } = useGameContext();
    const game = selectGame(gameId);
    const { user } = useAuthContext();

    useEffect(() => {
        gameService.getDetails(gameId)
            .then(game => {
                commentService.getByGameId(gameId)
                    .then(comments => {
                        fetchGameDetails({...game, comments: comments});
                    });
            })
    }, [gameId])

    const addCommentHandler = (ev) => {
        ev.preventDefault();
        commentService.createComment(game._id, comment)
            .then(result => {
                addComment(game._id, result);
                setComment('')
            });
    }

    const onChange = (ev) => {
        setComment(formState => ev.target.value)
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    {game.comments && game.comments.length > 0
                        ? <ul>
                            {game.comments.map((c) => <Comment key={c._id} comment={c} />)}
                        </ul>

                        : <p className="no-comment">No comments.</p>}
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {game._ownerId === user._id
                    ?
                    <div className="buttons">
                        <Link to={`/edit/${game._id}`} className="button">
                            Edit
                        </Link>
                        <Link to={`/delete/${game._id}`} className="button">
                            Delete
                        </Link>
                    </div>
                    : null
                }
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
}
export default Details; 