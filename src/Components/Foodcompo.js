const Foodcompo = ({ name, image_url }) => {
  return (
    <div className="card">
      <div className="card_body">
        <div className="card_image">
        <img src={image_url} alt={name} />
        </div>
      </div>
      <div className="card_title">{name}</div>
    </div>
  );
};

export default Foodcompo;
