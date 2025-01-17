import PropTypes from 'prop-types';

function UserIcon({ firstName = "", lastName = "" }) {
  // Ensure firstName and lastName are not undefined or empty
  const initials = `${(firstName && firstName.charAt(0).toUpperCase()) || "N"}${(lastName && lastName.charAt(0).toUpperCase()) || "A"}`;
  
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-lg">
      {initials}
    </div>
  );
}

UserIcon.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default UserIcon;
