import type {ButtonStyleTypes, InputStylesType, TextareaStylesType} from "@material-tailwind/react";

const button: Partial<ButtonStyleTypes> = {
  styles: {
    base: {
      initial: {
        shadow: "!shadow-none",
        textTransform: "normal-case",
        textSize: "!text-base",
        paddingY: "!py-1",
        borderWidth: "!border-2",
        borderColor: "border-transparent"
      }
    }
  }
}

const input: Partial<InputStylesType> = {
  styles: {
    base: {
      container: {
        minWidth: "min-w-0"
      },
      input: {
        borderWidth: "!border-2",
      },
      label: {
        display: "hidden"
      }
    },
    variants: {
      outlined: {
        base: {
          input: {
            borderColor:
              "!border-gray-900",
          },
        }
      },
      standard: {},
      static: {}
    }
  }
}

const textarea: Partial<TextareaStylesType> = {
  styles: {
    base: {
      textarea: {
        borderWidth: "!border-2",
      },
      label: {
        display: "hidden"
      }
    },
    variants: {
      outlined: {
        base: {
          textarea: {
            borderColor:
              "!border-gray-900",
          },
        }
      },
      standard: {},
      static: {}
    }
  }
}

const theme = {
  button, input, textarea
}

export default theme;