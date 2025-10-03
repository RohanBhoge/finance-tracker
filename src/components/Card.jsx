const Card = ({ children, className }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

export default Card;
