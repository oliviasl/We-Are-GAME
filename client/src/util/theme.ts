import type {ButtonStyleTypes, InputStylesType} from "@material-tailwind/react";

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

const theme = {
  button, input
}

export default theme;