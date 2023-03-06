import './App.css';
import Header from './components/header/Header';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
    <div id="box">
  <Header/>
  {/* Main Content */}
  <main id="main-content"></main>
  {/*Home Page*/}
  <Home/>
  {/* Login Page ( Only for Guest users ) */}
  <section id="login-page" className="auth">
    <form id="login">
      <div className="container">
        <div className="brand-logo" />
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Sokka@gmail.com"
        />
        <label htmlFor="login-pass">Password:</label>
        <input type="password" id="login-password" name="password" />
        <input type="submit" className="btn submit" defaultValue="Login" />
        <p className="field">
          <span>
            If you don't have profile click <a href="#">here</a>
          </span>
        </p>
      </div>
    </form>
  </section>
  {/* Register Page ( Only for Guest users ) */}
  <section id="register-page" className="content auth">
    <form id="register">
      <div className="container">
        <div className="brand-logo" />
        <h1>Register</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="maria@email.com"
        />
        <label htmlFor="pass">Password:</label>
        <input type="password" name="password" id="register-password" />
        <label htmlFor="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" />
        <input className="btn submit" type="submit" defaultValue="Register" />
        <p className="field">
          <span>
            If you already have profile click <a href="#">here</a>
          </span>
        </p>
      </div>
    </form>
  </section>
  {/* Create Page ( Only for logged-in users ) */}
  <section id="create-page" className="auth">
    <form id="create">
      <div className="container">
        <h1>Create Game</h1>
        <label htmlFor="leg-title">Legendary title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter game title..."
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter game category..."
        />
        <label htmlFor="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min={1}
          placeholder={1}
        />
        <label htmlFor="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Upload a photo..."
        />
        <label htmlFor="summary">Summary:</label>
        <textarea name="summary" id="summary" defaultValue={""} />
        <input
          className="btn submit"
          type="submit"
          defaultValue="Create Game"
        />
      </div>
    </form>
  </section>
  {/* Edit Page ( Only for the creator )*/}
  <section id="edit-page" className="auth">
    <form id="edit">
      <div className="container">
        <h1>Edit Game</h1>
        <label htmlFor="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" defaultValue="" />
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" defaultValue="" />
        <label htmlFor="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min={1}
          defaultValue=""
        />
        <label htmlFor="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
        <label htmlFor="summary">Summary:</label>
        <textarea name="summary" id="summary" defaultValue={""} />
        <input className="btn submit" type="submit" defaultValue="Edit Game" />
      </div>
    </form>
  </section>
  {/*Details Page*/}
  <section id="game-details">
    <h1>Game Details</h1>
    <div className="info-section">
      <div className="game-header">
        <img className="game-img" src="images/MineCraft.png" />
        <h1>Bright</h1>
        <span className="levels">MaxLevel: 4</span>
        <p className="type">Action, Crime, Fantasy</p>
      </div>
      <p className="text">
        Set in a world where fantasy creatures live side by side with humans. A
        human cop is forced to work with an Orc to find a weapon everyone is
        prepared to kill for. Set in a world where fantasy creatures live side
        by side with humans. A human cop is forced to work with an Orc to find a
        weapon everyone is prepared to kill for.
      </p>
      {/* Bonus ( for Guests and Users ) */}
      <div className="details-comments">
        <h2>Comments:</h2>
        <ul>
          {/* list all comments for current game (If any) */}
          <li className="comment">
            <p>Content: I rate this one quite highly.</p>
          </li>
          <li className="comment">
            <p>Content: The best game.</p>
          </li>
        </ul>
        {/* Display paragraph: If there are no games in the database */}
        <p className="no-comment">No comments.</p>
      </div>
      {/* Edit/Delete buttons ( Only for creator of this game )  */}
      <div className="buttons">
        <a href="#" className="button">
          Edit
        </a>
        <a href="#" className="button">
          Delete
        </a>
      </div>
    </div>
    {/* Bonus */}
    {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form">
        <textarea
          name="comment"
          placeholder="Comment......"
          defaultValue={""}
        />
        <input
          className="btn submit"
          type="submit"
          defaultValue="Add Comment"
        />
      </form>
    </article>
  </section>
  {/* Catalogue */}
  <section id="catalog-page">
    <h1>All Games</h1>
    {/* Display div: with information about every game (if any) */}
    <div className="allGames">
      <div className="allGames-info">
        <img src="./images/avatar-1.jpg" />
        <h6>Action</h6>
        <h2>Cover Fire</h2>
        <a href="#" className="details-button">
          Details
        </a>
      </div>
    </div>
    <div className="allGames">
      <div className="allGames-info">
        <img src="./images/avatar-1.jpg" />
        <h6>Action</h6>
        <h2>Zombie lang</h2>
        <a href="#" className="details-button">
          Details
        </a>
      </div>
    </div>
    <div className="allGames">
      <div className="allGames-info">
        <img src="./images/avatar-1.jpg" />
        <h6>Action</h6>
        <h2>MineCraft</h2>
        <a href="#" className="details-button">
          Details
        </a>
      </div>
    </div>
    {/* Display paragraph: If there is no games  */}
    <h3 className="no-articles">No articles yet</h3>
  </section>
</div>

    </div>
  );
}

export default App;
