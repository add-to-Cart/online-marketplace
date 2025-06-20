const isProfileComplete = (data) => {
  return typeof data?.username === "string" && data.username.trim() !== "";
};
