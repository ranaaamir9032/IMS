// Add user's data to local
export const inLocal = (props) => {
  window.localStorage.setItem("user-role", props);
};

// Get data from local
export const outLocal = (key) => {
  const data = window.localStorage.getItem(key);
  return data;
};


//Store entire data object in local 
export const storeToLocal = (dataObject) => {
  for (const [key, value] of Object.entries(dataObject)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};


// count for current month
export const countThisMonth = (countArr) => {
  const currentMonth = new Date().getMonth();
  const filteredArr = countArr?.filter((e) => parseInt(e.month) == currentMonth);
  return filteredArr?.[0]?.count || 0;
};

export function getCountForCurrentMonth(data) {
  const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)

  if (data && data.length > 0) {
    const currentMonthObject = data.find(obj => parseInt(obj.month) === currentMonth);

    if (currentMonthObject) {
      return currentMonthObject.count;
    }
  }

  return 0; // Return 0 if no object is found for the current month or if data is undefined or empty
}