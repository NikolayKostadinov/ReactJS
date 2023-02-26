import ContactForm from "./footer-elements/ContactForm";
import FooterNavigation from "./footer-elements/FooterNavigation";
import TwitterFeed  from "./footer-elements/TwitterFeed";


export default function Footer(){
    return(
        <div className="container-fluid footer">
        <div className="row contact">
        <ContactForm />
          <TwitterFeed />
        </div>
        <div className="row footer-credit">
          <div className="col-md-6 col-sm-6">
            <p>&copy; 2015, <a href="http://www.designerdada.com">DesignerDada.com</a> | All rights reserved.</p>
          </div>
          <div className="col-md-6 col-sm-6">
            <FooterNavigation />
          </div>
        </div>
      </div>
    );
}
