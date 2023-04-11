const RestaurantImage = ({ imageUrl, altText }) => {
    return (
        <div className="col-6">
            <div className="img-wrapper">
                <img
                    alt={altText}
                    src={imageUrl}
                    className="w-100 rounded shadow"
                />
            </div>
        </div>
    );
}
export default RestaurantImage;