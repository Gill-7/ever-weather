function formData() {
  const input = document.querySelector(".search-input");
  const cityName = input.value;
  if (cityName) {
    return cityName
      .replace(/(\s+$|^\s+)/g, "")
      .replace(/(,\s+)/g, ",")
      .replace(/(\s+,)/g, ",")
      .replace(/\s+/g, "+");
  }
  return "";
}

export { formData };
