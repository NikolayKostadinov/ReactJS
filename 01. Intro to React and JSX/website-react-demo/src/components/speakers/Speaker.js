export default function Speaker({image, name}){
    return(
        <div className="col-md-4 col-sm-6 feature">
        <img src={image} className="speaker-img" />
        <h3>{name}</h3>
        <p>Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things...</p>
        <ul className="speaker-social">
          <li><a href="#"><span className="ti-facebook"></span></a></li>
          <li><a href="#"><span className="ti-twitter-alt"></span></a></li>
          <li><a href="#"><span className="ti-linkedin"></span></a></li>
        </ul>
      </div>
    );
}