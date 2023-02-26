import Speaker from "./Speaker";

export default function Speakers() {
    return (
        <div className="row me-row content-ct speaker" id="speakers">
            <h2 className="row-title">Meet the Speakers</h2>
            <Speaker image="img/speaker-1.png" name="Simon Collins"/>
            <Speaker image="img/speaker-2.png" name="Stephanie Troeth"/>
            <Speaker image="img/speaker-3.png" name="Harry Roberts"/>
            <Speaker image="img/speaker-4.png" name="Geri Coady"/>
            <Speaker image="img/speaker-5.png" name="Andy Budd"/>
            <Speaker image="img/speaker-6.png" name="Christian Lauke"/>
        </div>
    );
}
