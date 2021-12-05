export const toFormData = (data) => {
  console.log(data);
  let formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }

  return formData;
};

/**
 *
 * @param {String} modalId
 */
export const openModal = (modalId) => {
  let $ = window.$;
  $(document).ready(function () {
    $(`#${modalId}`).modal("show");
  });
};

/**
 *
 * @param {String} modalId
 */
export const closeModal = (modalId) => {
  let $ = window.$;
  $(document).ready(function () {
    $(`#${modalId}`).modal("hide");
  });
};

export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
