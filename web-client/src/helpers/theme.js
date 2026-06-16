import { color } from "d3";

export const theme = {
  global: {
    colors: {
      text: "#333",
      control: "blue",
      disabled: "#ccc",
    },
    font: {
      family: "Helvetica Neue, Helvetica, Arial, sans-serif",
      height: 1.42857143,
    },
    focus: {
      border: {
        color: "transparent",
      },
    },
    input: {
      font: {
        size: "14px",
      },
    },
  },
  radioButton: {
    border: {
      color: "#777",
      width: "1px",
    },
    check: {
      color: "blue",
      border: {
        color: "blue",
      },
    },
    hover: {
      border: {
        color: "#333",
      },
    },
    size: "13px",
    color: "blue",
  },
  rangeInput: {
    thumb: {
      color: "blue",
    },
  },
  checkBox: {
    border: {
      color: "#333",
      width: "1px",
    },
    check: {
      color: "#333",
      border: {
        color: "#333",
      },
    },
    hover: {
      border: {
        color: "#333",
      },
    },
    stroke: {
      color: "#333",
    },
    size: "13px",
  },
  text: {
    font: {
      family: "Helvetica Neue",
      height: 1.42857143,
    },
    small: {
      height: 1.42857143,
    },
    medium: {
      size: "14px",
      height: "20px",
    },
  },
  button: {
    active: {
      default: {
        border: {
          width: "1px",
          color: "#ccc",
          radius: "4px",
        },
      },
    },
    border: {
      width: "1px",
      color: "#ccc",
      radius: "4px",
    },
    extend: `
      /* Keep navbar buttons borderless without using !important */
      .navbar &,
      .navbar &:hover,
      .navbar &:focus,
      .navbar &:focus-visible,
      .navbar &:active {
        border: none;
        background-color: transparent;
        box-shadow: none;
      }

      border-radius: 4px;
      &:hover,
      &:focus,
      &:focus-visible,
      &:active {
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: none;
      }
    `,
  },
  fileInput: {
    message: {
      size: "xsmall",
    },
    border: {
      style: "solid",
      color: "light-4",
      radius: "2px",
    },
    hover: {
      background: {
        color: "light-1",
      },
      border: {
        style: "solid",
        color: "light-4",
      },
    },
  },
  select: {
    icons: {
      color: "black",
      size: "medium",
    },
    container: {
      extend: `
        [role="option"]:hover,
        button[role="option"]:hover,
        [role="option"] button:hover {
          background-color: #f2f2f2;
          color: #333;
          border-color: transparent;
        }

        [role="option"][aria-selected="true"],
        button[role="option"][aria-selected="true"],
        [role="option"] button[aria-selected="true"] {
          background-color: #ebebeb;
          color: #333;
        }

        [role="option"] *,
        button[role="option"] *,
        [role="option"] button * {
          color: inherit;
        }
      `,
    },
  },
};
