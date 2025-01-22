exports.isValidEmail = function (correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

exports.isValidPhone = function (phone) {
  const regex = /^\d+$/;
  return regex.test(phone);
};


exports.isValidPasswordString = (value) => {
  if (value === null || value === undefined || value.length < 8) {
    return false;
  }

  if (typeof value === "string" && value.trim() === "") {
    return false;
  }
  return true;
};
