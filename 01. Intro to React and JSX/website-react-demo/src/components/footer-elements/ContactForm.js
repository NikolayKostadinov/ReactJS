export default function ContactForm() {
    return (
        <div className="col-md-6 contact-form">
            <h3 className="content-ct"><span className="ti-email"></span>Contact Form</h3>
            <form className="form-horizontal" data-toggle="validator" role="form">
                <div className="form-group">
                    <label htmlFor="name" className="col-sm-3 control-label">Name<sup>*</sup></label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="name" placeholder="John Doe" required />
                        <div className="help-block with-errors pull-right"></div>
                        <span className="form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-sm-3 control-label">Email<sup>*</sup></label>
                    <div className="col-sm-9">
                        <input type="email" className="form-control" id="email" placeholder="you@youremail.com" required />
                        <div className="help-block with-errors pull-right"></div>
                        <span className="form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="message" className="col-sm-3 control-label">Your Message<sup>*</sup></label>
                    <div className="col-sm-9">
                        <textarea id="message" className="form-control" rows="3" required></textarea>
                        <div className="help-block with-errors pull-right"></div>
                        <span className="form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-9">
                        <button type="submit" id="submit" name="submit" className="btn btn-yellow pull-right">Send <span className="ti-arrow-right"></span></button>
                    </div>
                </div>
            </form>
        </div>

    );
}